# 概述

前端三大基础（又称 **三大马车**）：

- **HTML（HyperText Markup Language）** —— **结构层**：用于定义网页的内容和结构（标签）。
- **CSS（Cascading Style Sheets）** —— **渲染层**：用于控制网页的样式和布局。
- **JavaScript** —— **行为层**：用于实现网页的动态交互。

> **补充**：HTML 负责网页的骨架，CSS 负责美化和布局，而 JavaScript 赋予网页交互性，它们共同构成了现代 Web 开发的核心技术。

JavaScript 是一种高级编程语言，用于Web开发和创建交互式用户界面。它是一种 **动态类型** 语言，意味着变量类型在运行时确定。

JavaScript 可以在浏览器中运行，也可以在服务器端使用 Node.js 运行。它具有广泛的应用，包括网页开发、游戏开发、移动应用程序开发等。JavaScript 具有易学性和灵活性，是Web开发中必不可少的一部分。

# 为什么学习 JavaScript

JavaScript 是目前**最流行**的编程语言之一，被广泛应用于**网页开发、游戏开发、移动应用、后端开发（Node.js）、桌面应用（Electron）**等多个领域。

学习 JavaScript 的优势：

1. **前端开发的核心** —— 现代网页的交互和动态效果几乎都依赖 JavaScript。
2. **生态丰富，前景广阔** —— 拥有 React、Vue、Angular 等强大的前端框架，以及 Node.js 让 JavaScript 也能用于后端开发。
3. **全栈开发** —— 既能编写前端，也能处理后端逻辑，实现一站式开发。
4. **高效提升开发效率** —— 通过现代前端工具（如 Webpack、Vite）和 TypeScript，可以大幅提高开发效率和代码质量。
5. **强大的社区支持** —— JavaScript 拥有庞大的开发者社区和丰富的学习资源，新手学习更容易。

因此，学习 JavaScript 不仅可以帮助我们**更高效地开发网页**，还能拓展到更广泛的领域（如全栈、移动端、小程序等），提升职业竞争力，是前端开发者的必修技能。

# JavaScript 历史

JavaScript 由 **Brendan Eich** 在 **1995 年**为 **Netscape** 公司的浏览器 **Netscape Navigator** 开发，并在短短 **10 天**内完成了第一版。

**发展历程：**

- 1995 年 —— 最初命名为 LiveScript，但由于当时 Java 语言的流行，Netscape 与 Sun Microsystems 合作，将其更名为 **JavaScript**，实际上与 Java 关系不大。
- 1996 年 —— 微软推出 JScript，用于 IE 浏览器，与 JavaScript 类似，但存在兼容性问题。
- 1997 年 —— ECMAScript 标准诞生（ES1），JavaScript 由 ECMA（欧洲计算机制造商协会）标准化，成为 ECMAScript（ES）
- 2009 年 —— ES5 发布，新增 JSON 支持、strict mode 等特性。
- 2015 年 —— ES6（ES2015）发布，引入 let、const、箭头函数、类、模块化（import/export） 等现代特性。
- 2016 年至今 —— **JavaScript 进入快速发展期**，ES 每年发布新版本（如 ES7、ES8…），同时现代前端框架（React、Vue、Angular）和后端技术（Node.js）让 JavaScript 生态更加成熟。

> **总结**：JavaScript 诞生于 **Web 时代**，最初用于网页交互，如今已成为 **全栈开发** 的核心语言，应用于**前端、后端、桌面应用、移动端、游戏开发**等多个领域，仍在持续进化。

# JavaScript 与 ECMAScript 

JavaScript 和 ECMAScript 是同一个东西吗？**不完全是。**

- **ECMAScript（ES）** 是 JavaScript 的**核心标准**，由 **ECMA 国际**（European Computer Manufacturers Association）制定，规定了 JavaScript 语言的语法和基本功能。
- **JavaScript** 是 ECMAScript 的**实现**之一，并在 ECMAScript 标准的基础上，添加了 **Web API**（如 DOM、BOM）、异步操作（如 setTimeout、fetch）等功能，使其更适用于 Web 开发。

**关系总结**：

- **ECMAScript** 规定了 JavaScript 语言的基本语法，如变量、作用域、对象、函数等。
- **avaScript** 遵循 ECMAScript 标准，并扩展了更多的功能（如 DOM 操作、事件处理）。
- **可以认为 JavaScript 是 ECMAScript 的超集**，但并不完全等同于 ECMAScript。

举例：

以下是 ECMAScript 规范内的代码：

```js
let name = "JavaScript"; // 变量
const greet = () => `Hello, ${name}`; // 箭头函数
console.log(greet()); // 输出: Hello, JavaScript
```

但 **DOM 操作** 并不属于 ECMAScript，而是 JavaScript 在浏览器环境中的扩展：

```js
document.getElementById("app").innerText = "Hello, JavaScript!";
```

> **总结**：ECMAScript **定义了 JavaScript 的核心规则**，而 JavaScript 在此基础上发展出了 **更多的功能**，尤其是在 Web 开发中（如 DOM 操作、事件处理）。

# ECMAScript 的历史

**ECMAScript（ES）** 是由 **Ecma 国际**（前身为欧洲计算机制造商协会）制定的**脚本语言标准**，用于规范 JavaScript 语法和功能。

起源：

- **1995 年**，Brendan Eich 在 Netscape 开发了一种脚本语言，最初命名为 **LiveScript**。
- 为了借助 Java 的热度，Netscape 将其更名为 **JavaScript**。
- **1997 年**，Netscape 将 JavaScript 提交给 **Ecma 国际** 进行标准化，并发布了 **ECMAScript 1.0**（ES1）。

ECMAScript 发展历程：

| **版本**          | **发布时间** | **主要特性**                                                 |
| ----------------- | ------------ | ------------------------------------------------------------ |
| **ES1**           | 1997         | ECMAScript 诞生，定义 JavaScript 基础语法                    |
| **ES2**           | 1998         | 小幅改进，与 ISO/IEC 16262 规范对齐                          |
| **ES3**           | 1999         | 引入 `try/catch` 异常处理、正则表达式、`JSON` 支持等         |
| **ES4 (取消)**    | -            | 由于意见不统一，ES4 计划被废弃                               |
| **ES5**           | 2009         | 引入 `strict mode`（严格模式）、`JSON`、`Object.defineProperty()`、`Array.prototype.map()` 等 |
| **ES6 (ES2015)**  | 2015         | 大量更新，包括 `let`、`const`、箭头函数、类（`class`）、`Promise`、`import/export` 模块等 |
| **ES7 (ES2016)**  | 2016         | `Array.prototype.includes()`、指数运算符 (`**`)              |
| **ES8 (ES2017)**  | 2017         | `async/await`、`Object.entries()`、`Object.values()`         |
| **ES9 (ES2018)**  | 2018         | `Promise.finally()`、`Rest/Spread` 语法扩展                  |
| **ES10 (ES2019)** | 2019         | `flat()`、`flatMap()`、`Object.fromEntries()`                |
| **ES11 (ES2020)** | 2020         | 可选链（`?.`）、空值合并（`??`）、动态 `import()`            |
| **ES12 (ES2021)** | 2021         | `String.prototype.replaceAll()`、逻辑赋值运算符 (`&&=`, `||=`, `??=`) |
| **ES13 (ES2022)** | 2022         | `class` 私有字段（`#`）、`top-level await`                   |

> **总结**：ECMAScript 由 **JavaScript 标准化**而来，每年都会推出新版本，为 JavaScript 语言带来更强大的功能，使其在**前端、后端、移动端**等领域不断发展。

# JavaScript 与 Java 的关系

JavaScript 和 Java 是 **完全不同** 的编程语言，它们在 **语法、用途、运行环境** 上都有明显区别。

- **JavaScript** 是一种 **动态** 的 **脚本语言**，主要用于 **网页前端开发**，在浏览器中运行，并由 **HTML、CSS** 共同构建交互式页面。
- **Java** 是一种 **静态** 的 **面向对象编程语言**，广泛用于 **后端开发、桌面应用、移动开发（Android）**，需要 **JVM（Java 虚拟机）** 执行。

为什么 JavaScript 里有 “Java”？

JavaScript 最初在 1995 年由 Netscape 公司推出时，名称是 **LiveScript**。由于当时 Java 语言非常流行，Netscape 出于 **营销目的**，与 Sun Microsystems（Java 的开发公司）合作，将其更名为 **JavaScript**，但两者本质上并无关系。

# JavaScript 引入方式

在网页开发中，可以通过多种方式引入 JavaScript 代码，主要有以下几种：

## 内联（行内）

直接在 HTML 标签的 onclick、onmouseover 等事件属性中写 JavaScript 代码。

```html
<button onclick="alert('Hello, JavaScript!')">点击我</button>
```

✅ **优点**：适用于简单的交互事件。

❌ **缺点**：代码可读性差，不利于维护，不推荐使用。

## 内部（嵌入式）

在 \<script> 标签内编写 JavaScript 代码，并放在 HTML 页面中。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>内部 JavaScript</title>
    <script>
        function showMessage() {
            alert('欢迎学习 JavaScript！');
        }
    </script>
</head>
<body>
    <button onclick="showMessage()">点击显示消息</button>
</body>
</html>
```

✅ **优点**：适用于小型项目，代码较为集中。

❌ **缺点**：HTML 和 JavaScript 耦合，影响代码的模块化。

## 外部（引入外部文件）

将 JavaScript 代码写在 **独立的 .js 文件** 中，并在 HTML 通过 \<script> 标签引入。

**（1）基础用法**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>外部 JavaScript</title>
    <script src="script.js"></script>
</head>
<body>
    <button onclick="showMessage()">点击显示消息</button>
</body>
</html>
```

📂 **文件结构**

```
/project
│── index.html
│── script.js
```

📜 **script.js**

```js
function showMessage() {
    alert('Hello, 外部 JavaScript!');
}
```

✅ **优点**：

- 代码复用性高，适合大型项目
- HTML 结构与 JavaScript 分离，提升可读性和维护性

## defer 与 async 加载

默认情况下，\<script> 会 **阻塞 HTML 解析**，影响页面加载速度。可以使用 defer 或 async 优化 JavaScript 加载方式。

**（1）defer（延迟执行）**

```html
<script src="script.js" defer></script>
```

✅ **特点**：

1. **不会阻塞 HTML 解析**，等 HTML 解析完成后再执行
2. 按照 **代码顺序** 执行多个 defer 资源
3. 适用于 **依赖 DOM 结构的 JavaScript**（推荐）

**（2）async（异步加载）**

```html
<script src="script.js" async></script>
```

✅ **特点**：

1. **不会阻塞 HTML 解析**，但**下载完成后立即执行**
2. 多个 async 资源 **执行顺序不确定**，适合 **不依赖 DOM** 的代码（如广告、统计脚本）

## 最佳实践

1. **推荐使用外部 JavaScript**，保持 HTML 结构清晰
2. **推荐使用 defer**，确保 JavaScript 在 HTML 解析后执行
3. **避免行内 JavaScript**，提升代码可维护性

# 拓展

## 数据结构 *（了解）*

这里只是简单介绍一些数据结构及其特点：

### 栈（Stack）

栈是一种**先进后出**（Last In First Out, LIFO）的数据结构。它的特点是：

- **入栈（Push）**：将元素加入栈顶。
- **出栈（Pop）**：从栈顶移除元素。
- 只有栈顶的元素可以被访问。

**应用场景**：

1. 浏览器历史记录的回退操作
2. 表达式求值（如括号匹配）
3. 递归算法的模拟

```js
let stack = [];
stack.push(1);  // 入栈
stack.push(2);
console.log(stack.pop());  // 出栈，输出 2
```

### 堆（Heap）

堆是一种特殊的树形数据结构，通常用于实现**优先队列**。它的特点是：

- 元素是**部分顺序**的，通常是按照**完全二叉树**来储存。
- **最大堆**：父节点的值大于或等于子节点的值。
- **最小堆**：父节点的值小于或等于子节点的值。
- 不是像栈和队列那样的顺序存储，可以通过“key”快速定位。

**应用场景**：

1. 优先队列（如 Dijkstra 最短路径算法）
2. 动态求解最大值或最小值

```js
// 使用 JavaScript 的优先队列示例（通过堆实现）
let heap = [];
heap.push(3);  // 插入元素
heap.push(1);
heap.push(2);
console.log(heap);  // 堆结构显示
```

### 队列（Queue）

队列是一种**先进先出**（First In First Out, FIFO）的数据结构。它的特点是：

- **入队（Enqueue）**：将元素加入队尾。
- **出队（Dequeue）**：从队头移除元素。
- 队列中的元素按顺序排队，最先进入的元素最先被处理。

**应用场景**：

1. 任务调度（如操作系统的进程调度）
2. 打印任务的排队
3. 异步编程中的事件队列

```js
let queue = [];
queue.push(1);  // 入队
queue.push(2);
console.log(queue.shift());  // 出队，输出 1
```

## 执行上下文（环境）

JavaScript 执行上下文是指在代码执行期间，JavaScript 引擎创建的一个**内部数据结构**，用于存储代码执行期间的**变量、函数、作用域链**等信息。每个执行上下文都有一个**变量对象（Variable Object, VO）**，用于存储当前执行环境中的所有变量和函数声明。

JavaScript 代码的执行上下文主要分为三种类型：

1. **全局执行上下文（Global Execution Context）**
2. **函数执行上下文（Function Execution Context）**
3. **Eval 执行上下文（Eval Execution Context）**（不推荐使用）

### 全局执行上下文

当 JavaScript 代码开始运行时，JS 引擎会首先创建一个**全局执行上下文**，该上下文会执行所有**不在函数内部**的代码，并包含以下内容：

1. **创建全局对象**（浏览器环境下是 window，Node.js 环境下是 global）
2. **创建全局变量对象（VO）**
3. **将 this 绑定到全局对象**

```js
console.log(this === window); // true (浏览器环境)
var a = 10;
function test() {
  console.log(a);
}
test();
```

在全局上下文中，this 指向全局对象 window。

### 函数执行上下文

每当一个函数被调用时，都会为该函数**创建一个新的执行上下文**，并包含：

1. **函数的变量对象（VO）**：存储函数内部声明的变量、参数和内部函数
2. **作用域链**（Scope Chain）：用于查找变量
3. **this 绑定**

```js
function foo(x) {
  var y = 2;
  function bar() {
    console.log(x, y);
  }
  bar();
}

foo(5); // 输出: 5 2
```

在 foo 执行时，它的执行上下文会被创建，bar 也会继承 foo 的作用域链。

### Eval 执行上下文

eval() 函数可以在运行时执行 JavaScript 代码，并会创建自己的执行上下文（但不推荐使用，因为它影响性能和安全性）。

```js
eval("var x = 10;");
console.log(x); // 10
```

这里 eval 代码在执行时会创建自己的执行上下文，但它仍然会修改全局变量。

## 执行上下文的生命周期

执行上下文的生命周期包括三个阶段：**创建阶段 → 执行阶段 → 销毁阶段**，本文重点介绍创建阶段。

**① 创建阶段**

在创建阶段，js 引擎会创建一个执行上下文对象，并进行以下操作：
- 创建变量对象（Variable Object，VO）：包括函数声明、函数参数、变量声明等。
- 确定 this 的指向。
- 创建作用域链（Scope Chain）：用于解析变量和函数的作用域。
- 初始化变量的值：将变量初始化为 undefined。

**② 执行阶段**

在执行阶段，js 引擎会按照代码的顺序执行，将变量赋值、函数调用等操作加入执行栈（Execution Stack）中，直到执行栈为空。

**③ 回收阶段**

在销毁阶段，JavaScript 引擎会进行以下操作：
- 执行垃圾回收（Garbage Collection）：回收不再使用的内存空间。
- 销毁变量对象和作用域链。

## 执行栈

执行栈，即 “调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。

js代码执行时首先会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

![](./IMGS/execution_stack.gif)

从上面的流程图，我们需要记住几个关键点：

- js执行在单线程上，所有的代码都是排队执行。
- 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
- 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
- 浏览器的 js 执行引擎总是访问栈顶的执行上下文。
- 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

我们再来看个例子：

```javascript
var color = 'blue';
function changeColor() {
  var anotherColor = 'red';
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  }
  swapColors();
}
changeColor();
```

上述代码运行按照如下步骤：

- 当上述代码在浏览器中加载时，JavaScript 引擎会创建一个全局执行上下文并且将它推入当前的执行栈
- 调用 `changeColor` 函数时，此时 `changeColor` 函数内部代码还未执行，js 执行引擎立即创建一个 changeColor 的执行上下文（简称 EC），然后把这执行上下文压入到执行栈（简称 ECStack）中。
- 执行 changeColor 函数过程中，调用 `swapColors` 函数，同样地，swapColors 函数执行之前也创建了一个 swapColors 的执行上下文，并压入到执行栈中。
- swapColors 函数执行完成，swapColors 函数的执行上下文出栈，并且被销毁。
- changeColor 函数执行完成，changeColor 函数的执行上下文出栈，并且被销毁。

![](./IMGS/ec_stack.png)

## 运行生命周期

js运行的生命周期，参照下图：

![](./IMGS/js_life_circles.png)

js的运行生命周期包括以下几个阶段：
1. **解析阶段**：js代码在执行之前需要被解析，解析器会对代码进行词法分析和语法分析，生成抽象语法树（AST）。
2. **编译阶段**：在编译阶段，js引擎会对AST进行优化和编译，生成可执行代码。
3. **执行阶段**：在执行阶段，js引擎会按照编译阶段生成的可执行代码，逐行执行js代码，执行过程中会涉及到变量的声明、赋值、函数调用等操作。在执行过程中，js引擎还会进行垃圾回收等操作，确保内存的有效使用。

## 编译原理

js编译原理是将js代码转换为可执行的机器代码的过程，它包括三个主要阶段：解析、转换和代码生成。

1. 在解析阶段，编译器将js代码转换为抽象语法树（AST）。
2. 在转换阶段，编译器将AST转换为中间表示（IR），并对其进行优化。
3. 在代码生成阶段，编译器将IR转换为机器代码，并生成可执行文件。

js编译器还包括一些其他的步骤，如词法分析、语法分析、类型检查和错误处理。这些步骤都是为了确保js代码能够正确地编译和执行。

