# 概述

[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 是 ES6 引入的一种原始数据类型，其主要作用是生成 **唯一且不可变** 的标识符。

`Symbol()` 函数会返回 **symbol** 类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："`new Symbol()`"。

# 应用场景

Symbol 的常见应用场景包括：

1. **作为对象的唯一属性名**：Symbol 能确保对象属性的唯一性，避免因属性名重复导致的意外覆盖。

   ```js
   const id = Symbol('id');
   const obj = {
     [id]: '12345'
   };
   ```

2. **实现私有属性或方法**：通过 Symbol 定义的属性在常规遍历（如 `for...in` 或 `Object.keys()`）中不可见，可用于模拟私有成员。

   ```js
   const _privateMethod = Symbol('privateMethod');
   class MyClass {
     [_privateMethod]() {
       // 私有方法逻辑
     }
   }
   ```

3. **定义唯一常量值**：Symbol 的不可重复特性使其适合表示需要严格区分的常量。

   ```js
   const LOG_LEVEL = {
     DEBUG: Symbol('debug'),
     INFO: Symbol('info'),
     ERROR: Symbol('error')
   };
   ```

4. **利用内置 Symbol 值扩展对象行为**：ES6 提供了如 `Symbol.iterator`、`Symbol.toStringTag` 等内置 Symbol，用于自定义对象的语言原生行为（如迭代、类型标签等）。

   ```js
   const obj = {
     [Symbol.toStringTag]: 'MyObject'
   };
   console.log(obj.toString());  // 输出：[object MyObject]
   ```

# 注意事项

1. Symbol 属性无法通过 `Object.keys()` 或 `for...in` 遍历，需使用 `Object.getOwnPropertySymbols()` 获取。
2. Symbol 的核心价值在于 **属性唯一性**、**代码封装性** 和 **对象行为扩展性**，合理使用可提升代码健壮性并减少命名冲突风险。