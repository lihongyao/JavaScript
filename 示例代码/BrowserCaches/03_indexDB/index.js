


// 数据库版本号
const version = 1;

// 初始化数据库
const db = new DB("db-learns", version, { students: "id" });

// 新增数据
async function onAdd() {
  if (!_name.value || !_age.value || !_job.value || !_city.value) {
    _tips.textContent = "温馨提示：请完善信息";
    return;
  }
  try {
    const id = await db.add("students", {
      id: Date.now().toString(),
      name: _name.value,
      age: +_age.value,
      job: _job.value,
      city: _city.value,
    });
    console.log(`新增成功，ID：${id}`);
    _tips.textContent = "新增成功！";
  } catch (error) {
    console.error("新增失败：", error);
    _tips.textContent = "新增失败！";
  }
}

// 删除数据
async function onDelete() {
  if (!_flag.value) {
    _tips.textContent = "温馨提示：请填写操作标识（ID）";
    return;
  }
  try {
    const resp = await db.delete("students", _flag.value);
    console.log(`删除结果：${resp}`);
    _tips.textContent = "删除成功！";
  } catch (error) {
    console.error("删除失败：", error);
    _tips.textContent = "删除失败！";
  }
}

// 更新数据
async function onPut() {
  if (!_name.value || !_age.value || !_job.value || !_city.value || !_flag.value) {
    _tips.textContent = "温馨提示：请完善信息";
    return;
  }
  try {
    const id = await db.put("students", {
      id: _flag.value,
      name: _name.value,
      age: +_age.value,
      job: _job.value,
      city: _city.value,
    });
    console.log(`更新成功，ID：${id}`);
    _tips.textContent = "更新成功！";
  } catch (error) {
    console.error("更新失败：", error);
    _tips.textContent = "更新失败！";
  }
}

// 查询数据
async function onGet() {
  if (!_flag.value) {
    _tips.textContent = "温馨提示：请填写操作标识（ID）";
    return;
  }
  try {
    const resp = await db.get("students", _flag.value);
    console.log("查询结果：", resp);
    _tips.textContent = resp ? `查询成功：${JSON.stringify(resp)}` : "无此记录！";
  } catch (error) {
    console.error("查询失败：", error);
    _tips.textContent = "查询失败！";
  }
}

// 遍历数据
async function onEach() {
  try {
    const resp = await db.each("students");
    console.log("所有数据：", resp);
    _tips.textContent = "遍历成功，查看控制台日志！";
  } catch (error) {
    console.error("遍历失败：", error);
    _tips.textContent = "遍历失败！";
  }
}
