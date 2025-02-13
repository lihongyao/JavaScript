 # 前言

在 Web 应用中，实现动画效果的方法有很多：

- CSS3：transition（过渡） / animation（动画）
- HTML5：Canvas
- JavaScript：
  - setInterval / setTimeout（定时器）
  - requestAnimationFrame（请求动画帧）
  - jQuery.animate()

本篇文章重点讲解 requestAnimationFrame（**请求动画帧**）。

它的用法类似于 setInterval，但与 setInterval 相比，最大的优势在于 **由浏览器决定函数的执行时机**。简单来说，它的工作方式是：**告诉浏览器 “我这里有一个动画任务要执行，你有空了帮我执行一下”**，然后浏览器会在合适的时间执行，以保证动画的流畅度和性能。

# 相关概念

在深入了解 requestAnimationFrame 的工作原理之前，我们先掌握几个重要概念。

## 页面可见

当页面被最小化或切换到后台标签页时，它处于 **不可见** 状态。浏览器会触发 visibilitychange 事件，并将 document.hidden 设为 true。当页面恢复可见时，该属性变回 false。

## 动画帧请求回调函数列表

每个 document 维护着一个**动画帧回调函数列表**，可以看作是 <handlerId, callback> 这样的集合：

- handlerId：整数，唯一标识回调函数的位置。
- callback：注册的回调函数。

当 requestAnimationFrame 被调用时，浏览器会将 callback 加入到该列表，并在合适的时机执行。

## 屏幕刷新频率

屏幕刷新率（Frame Rate）指的是**屏幕每秒刷新图像的次数**，单位为赫兹（Hz）。一般笔记本和显示器的刷新率为 **60Hz**，即 **每 16.7 毫秒刷新一次**（1000ms / 60 ≈ 16.7ms）。

## 动画实现原理

动画的本质是让画面发生平滑的变化，让人眼察觉到视觉上的运动。例如：

1. **假设屏幕刷新率为 60Hz，每 16.7ms 更新一次**。
2. **在每次刷新前，将物体向左移动 1px**。
3. **由于视觉暂留效应，画面上的物体似乎是在平滑移动**。

如果代码能做到 **每帧都在屏幕刷新前更新**，那么动画就会流畅无比。requestAnimationFrame 就是专门为此设计的 API。

# API

## 语法

```js
const handlerId = requestAnimationFrame(callback);
```

- `callback`：每一帧执行的回调函数。
- `handlerId`：唯一的 ID，可用于取消动画。

## 浏览器执行过程

浏览器执行 requestAnimationFrame 时，会按照以下流程：

1. **判断页面是否可见**（document.hidden 是否为 false）。
2. **清空上一轮的回调函数**。
3. **将新的 <handlerId, callback> 加入回调队列**。
4. **在下次屏幕刷新前，遍历回调列表，执行所有 callback**。

## 取消动画

可以使用 cancelAnimationFrame(handlerId) 取消特定动画：

```js
cancelAnimationFrame(handlerId);
```

适用于：

1. 动画停止时取消动画。
2. 防止动画多次触发。
3. 优化性能，减少 CPU 计算。

# 使用示例

## 动画

requestAnimationFrame 主要用于 **平滑动画**，它能**自适应屏幕刷新率**，保证动画流畅。

**示例：进度条动画**

```html
<div class="progress">
  <div class="v"></div>
</div>
<button type="button" onclick="onLoading()">Loading</button>
<button type="button" onclick="onStop()">Stop</button>
```

```css
.progress {
  width: 300px;
  height: 10px;
  border-radius: 12px;
  background: #eee;
  margin-bottom: 16px;
}
.v {
  height: 100%;
  background: cornflowerblue;
  border-radius: 12px;
}
```

```javascript
// -- 获取DOM元素
let progress = document.querySelector('.v');
// -- 记录步长
let step;
// -- 记录回调函数
let handlerId;
// -- 动画帧回调函数
function render() {
  step++;
  progress.style.width = `${step}%`;
  if (step < 100) {
    handlerId = window.requestAnimationFrame(render);
  }
}
// -- 点击Loading按钮时触发，调用动画效果
function onLoading() {
  step = 0;
  progress.style.width = '0%';
  render();
}
// -- 点击Stop按钮时触发，停止动画
function onStop() {
  cancelAnimationFrame(handlerId);
}
```

演示效果：

![](./IMGS/rAF.gif)

## 函数节流

requestAnimationFrame 也可用于**节流高频事件**（如 mousemove、scroll），确保 16.7ms 只执行一次 *（注：16ms内函数执行多次没有意义，因为显示器16ms 刷新一次，多次执行并不会在界面上有任何显示）*。

```javascript
window.addEventListener("mousemove", (event) => {
  requestAnimationFrame(() => {
    console.log(event.clientX, event.clientY);
  });
});
```

## CPU节能

当网页进入后台或被最小化时，requestAnimationFrame **自动暂停**，降低 CPU 负担。而 setInterval 则仍然会运行。

```js
function animate() {
  console.log("动画帧执行");
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

切换到后台时，**动画将自动暂停**。

## 优雅降级

由于兼容性问题，需要降级对接口进行封装，优先使用高级特性，再根据浏览器不同情况进行回退，直到只能使用 `setTimeout`。

参考：https://github.com/darius/requestAnimationFrame

## 分帧初始化

都知道，rAF 的执行时间约为16.7ms，即为一帧。那么可以使用它将页面初始化的函数进行打散到每一帧里，这样 **可以在初始化时降低CPU及内存开销**。

很多页面，初始化加载时，CPU 都会有很明显的波动，就是因为大量的操作都集中到了一点上。

举个例子：

页面中有4个模块，A、B、C、D，在页面加载时进行实例化，一般的写法类似于：

```javascript
$(function(){
    new A();
    new B();
    new C();
    new D();
})
```

而使用 rAF 可将每个模块分别初始化，即 **每个模块都有16ms的初始化时间**

```javascript
class A {}
class B {}
class C {}
class D {}
var lazyLoadList = [A, B, C, D];
lazyLoadList.forEach((module) => {
  window.requestAnimationFrame(() => {
    new module();
  });
});
```

## 异步化

过去，我们用 `setTimeout(() => {}, 0)` 来异步执行任务，现在可以用 requestAnimationFrame 代替：

```js
requestAnimationFrame(() => {
  console.log("异步任务执行");
});
```

# setInterval vs requestAnimationFrame

这里主要是比较二者在动画上的区别

> **📌 `setInverval` 的问题** 

setInterval 设置一个固定间隔执行动画，但 **实际执行时间会因主线程阻塞而延迟**，可能导致 **丢帧和卡顿**。

**丢帧示例**

如果 setInterval(fn, 10)，但屏幕刷新率是 60Hz（每 16.7ms 刷新一次）：

- setInterval 执行 10ms 后更新动画（但屏幕未刷新）。
- **下一次刷新是 16.7ms 后，导致 10ms 这帧被跳过，动画变得卡顿**。

扩展示例：

假设屏幕每隔16.7ms刷新一次，而 setInterval 每隔10ms设置图像向左移动1px， 就会出现如下绘制过程：

- 第0ms :  屏幕未刷新，等待中，setInterval 也未执行，等待中；
- 第10ms:  屏幕未刷新，等待中，setInterval 开始执行并设置图像属性left=1px；
- 第16.7ms:  屏幕开始刷新，屏幕上的图像向左移动了1px， setInterval 未执行，继续等待中；
- 第20ms:  屏幕未刷新，等待中，setInterval 开始执行并设置left=2px;
- 第30ms:  屏幕未刷新，等待中，setInterval 开始执行并设置left=3px;
- 第33.4ms：屏幕开始刷新，屏幕上的图像向左移动了3px，setInterval 未执行，继续等待中；
- …

从上面的绘制过程中可以看出，屏幕没有更新 `left=2px` 的那一帧画面，图像直接从1px的位置跳到了3px的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。

> **📌 `requestAnimationFrame` 的优势** 

1. **自动匹配刷新率**，不会导致丢帧。
2. **自动暂停后台动画，降低 CPU 负担**。
3. **平滑的动画体验**。

**对比示例**

```js
var progress = 0;
// -- 回调函数
function render() {  
  // 修改图像的位置  
  progress += 1; 
  if (progress < 100) {  
    // 在动画没有结束前，递归渲染    
    window.requestAnimationFrame(render); 
  }
}
// -- 第一帧渲染
window.requestAnimationFrame(render);
```

与 setInterval 相比，requestAnimationFrame **更适合处理动画**。

# 总结

- requestAnimationFrame 适用于 **动画、节流、异步任务**。
- 其 **自动匹配刷新率**，能防止丢帧。
- 在 **后台自动暂停**，提高性能。
- **可用于分帧初始化，避免页面卡顿**。

在实际开发中，**所有与动画相关的操作，建议使用 requestAnimationFrame 而非 setInterval**。





