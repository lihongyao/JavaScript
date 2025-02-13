class DB {
  /**
   * 构造器
   * @param {string} databaseName 数据库名
   * @param {number} version 数据库版本号（仅支持整数）
   * @param {object} storeOptions 配置项 { 表名：主键 }
   */
  constructor(databaseName, version, storeOptions) {
    // 缓存数据库 { [name + version]：database }
    this.dbs = {};
    this.databaseName = databaseName;
    this.open(databaseName, version, storeOptions);
  }

  /**
   * 打开数据库
   * @param {string} databaseName 数据库名
   * @param {number} version 数据库版本号（仅支持整数）
   * @param {object} storeOptions 配置项 { 表名：主键 }
   * @returns {Promise<IDBDatabase>} 返回数据库实例
   */
  open(databaseName, version, storeOptions) {
    return new Promise((resolve, reject) => {

      // 检查缓存是否存在
      const dbKey = `${databaseName}_${version}`;
      if (this.dbs[dbKey]) {
        resolve(this.dbs[dbKey]);
        return;
      }
      
      // 尝试打开数据库
      const request = indexedDB.open(databaseName, version);

      // 数据库版本更新时触发，通常用于创建或更新表结构
      request.onupgradeneeded = (event) => {
        console.log("【Indexed-DB】：数据库升级中...");
        const database = event.target.result;
        // 遍历配置项，创建新的数据表（objectStore）
        for (const storeName in storeOptions) {
          if (!database.objectStoreNames.contains(storeName)) {
            const keyPath = storeOptions[storeName] || "id"; // 默认主键为 "id"
            database.createObjectStore(storeName, { keyPath });
          }
        }
      };

      // 数据库打开成功
      request.onsuccess = (event) => {
        console.log("【Indexed-DB】：数据库打开成功");
        const database = event.target.result;
        this.dbs[dbKey] = database; // 缓存数据库实例
        resolve(database);
      };

      // 数据库打开失败
      request.onerror = (event) => {
        console.error("【Indexed-DB】：数据库打开失败", event.target.error);
        reject(new Error(`数据库打开失败：${event.target.error.message}`));
      };
    });
  }

  /**
   * 获取事务
   * @param {string} storeName 表名
   * @param {string} mode 事务模式（默认只读 "readonly"，可选 "readwrite"）
   * @returns {Promise<IDBTransaction>} 返回事务实例
   */
  async _getTransaction(storeName, mode = "readonly") {
    const dbKey = `${this.databaseName}_${this._version}`;
    const db = this.dbs[dbKey] || (await this.open(this.databaseName, this._version));
    return db.transaction([storeName], mode);
  }

  /**
   * 获取数据表对象
   * @param {string} storeName 表名
   * @param {string} mode 事务模式（默认只读 "readonly"，可选 "readwrite"）
   * @returns {Promise<IDBObjectStore>} 返回数据表实例
   */
  async _getObjectStore(storeName, mode = "readonly") {
    const transaction = await this._getTransaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  /**
   * 执行指定操作的通用方法
   * @param {string} storeName 表名
   * @param {string} action 操作类型（如 "get", "add", "put", "delete"）
   * @param {...any} args 其他参数
   * @returns {Promise<any>} 返回操作结果
   */
  async _executeRequest(storeName, action, ...args) {
    const objectStore = await this._getObjectStore(storeName, action === "get" ? "readonly" : "readwrite");
    return new Promise((resolve, reject) => {
      const request = objectStore[action](...args);
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => {
        console.error(`【Indexed-DB】：${action} 操作失败`, event.target.error);
        reject(event.target.error);
      };
    });
  }

  /**
   * 添加数据
   * @param {string} storeName 表名
   * @param {object} data 数据对象
   * @returns {Promise<number>} 返回新增数据的主键值
   */
  async add(storeName, data) {
    return this._executeRequest(storeName, "add", data);
  }

  /**
   * 获取数据
   * @param {string} storeName 表名
   * @param {string | number} id 主键值
   * @returns {Promise<object>} 返回数据对象
   */
  async get(storeName, id) {
    return this._executeRequest(storeName, "get", id);
  }

  /**
   * 更新数据
   * @param {string} storeName 表名
   * @param {object} data 数据对象
   * @returns {Promise<number>} 返回更新数据的主键值
   */
  async put(storeName, data) {
    return this._executeRequest(storeName, "put", data);
  }

  /**
   * 删除数据
   * @param {string} storeName 表名
   * @param {string | number} id 主键值
   * @returns {Promise<boolean>} 返回操作结果
   */
  async delete(storeName, id) {
    await this._executeRequest(storeName, "delete", id);
    return true;
  }

  /**
   * 清空数据表
   * @param {string} storeName 表名
   * @returns {Promise<void>} 返回操作结果
   */
  async clear(storeName) {
    await this._executeRequest(storeName, "clear");
  }

  /**
   * 获取所有数据
   * @param {string} storeName 表名
   * @returns {Promise<Array<object>>} 返回数据数组
   */
  async getAll(storeName) {
    const objectStore = await this._getObjectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = objectStore.getAll();
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  /**
   * 遍历数据
   * @param {string} storeName 表名
   * @param {function} callback 遍历回调函数 (cursor) => void
   * @returns {Promise<void>}
   */
  async each(storeName, callback) {
    const objectStore = await this._getObjectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = objectStore.openCursor();
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          callback(cursor.value);
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = (event) => reject(event.target.error);
    });
  }
}
