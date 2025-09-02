# 概述

[DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)（**D**ocument **O**bject **M**odel，即 文档对象模型）**是网页的编程接口**，它将 HTML / XML 解析为 **结构化的对象**，从而允许 JavaScript 对网页进行操作（如增删改查）。

浏览器根据 DOM 规范，将文档解析成 **树状结构（DOM 树）**，其中每个部分（标签、属性、文本等）都是 **节点（Node）**。所有节点都遵循统一的 API，可供 JavaScript 操作。

> **注意**：DOM 并不属于 JavaScript，但 JS 是最常用于操作 DOM 的语言。

# 节点

## 概念

DOM 的最小组成单位叫做 **节点**（`Node`）。文档的树形结构（DOM树），就是由各种不同类型的节点组成。

节点的类型有七种：

- `Document`：**文档节点**，代表整个网页（DOM 树的根节点）
- `DocumentType`：**文档类型节点类型** ：如 \<!DOCTYPE html>
- `Element`：**元素节点**，网页的 HTML 标签，如 \<body>、\<a>。
- `Attribute`：**属性节点**，元素的属性，如 class="right"（现代 JS 主要通过 element.getAttribute() 操作）。
- `Text`：**文本节点** ，元素或属性中的文本内容
- `Comment`：**注释节点** ，TML 中的 \<!-- 注释 -->
- `DocumentFragment`：轻量级的 DOM 结构，常用于批量插入节点以优化性能。

> 提示：这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

我们可通过 `nodeName` 和 `nodeType` 属性判断对应节点的名称和类型。

| 类型                     | 描述     | `nodeName`                   | `nodeType` |
| ------------------------ | -------- | ---------------------------- | ---------- |
| `ELEMENT_NODE` *         | 元素节点 | 大写的HTML标签名             | 1          |
| `ATTRIBUTE_NODE` *       | 属性节点 | 等同于 `Attr.name`（属性名） | 2          |
| `TEXT_NODE` *            | 文本节点 | `#text`                      | 3          |
| `COMMENT_NODE`           | 注释节点 | `#comment`                   | 8          |
| `DOCUMENT_NODE`          | 文档节点 | `#document`                  | 9          |
| `DOCUMENT_FRAGMENT_NODE` |          | `#document-fragment`         | 11         |
| `DOCUMENT_TYPE_NODE`     |          | 等同于 `DocumentType.name`   | 10         |

> 提示：本节知识点作为了解即可。

##  节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构，这种树状结构就是 **DOM树**。

最顶层的节点就是 `document` 节点，它代表了整个文档。文档里面最高一层的 `HTML` 标签，一般是 `<html>`，它构成树结构的根节点，其他HTML标签节点都是它的下级。

除了根节点以外，其他节点对于周围的节点都存在两种关系：

- 父子关系
- 兄弟关系

示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Tutorial</title>
  </head>
  <body>
    <h1>DOMs</h1>
    <a href="#">主页</a>
  </body>
</html>
```

上述代码的节点树模型：

![](IMGS/nodeTree.png)

## 节点集合

节点都是单个对象，有时会需要一种数据结构，能够容纳多个节点。DOM提供两种集合对象，用于实现这种节点的集合：

- `NodeList`
- `HTMLCollection`

访问集合成员可通过 `下标` 或 `.item(index)` 获取。

> 提示：`NodeList` / `HTMLCollection` 属于 **类似数组** 对象，不能直接使用数组方法，如果要通过数组方法来遍历节点集合，你需要将它们转换为真正的数组。

# 节点查询

为了便于演示后面的示例，我们现在在 `<body>`标签中插入以下内容：

```html
<div id="company">成都哈戳戳科技有限公司</div>
<ul class="departments">
  <li>教学部</li>
  <li>教务部</li>
  <li>市场部</li>
  <li>咨询部</li>
  <li>行政部</li>
  <li>财务部</li>
</ul>
<div name="address">成都市高新区新川科技园A区</div>
```

## 直接查找 *

```js
// 1. 根据ID查找
document.getElementById("company"); 
// 2. 根据name属性查找
document.getElementsByName("address");
// 3. 根据类名查找
document.getElementsByClassName("departments");
// 4. 根据标签名查找
document.getElementsByTagName("li");
// 5. 根据CSS选择器查找
document.querySelector("#company"); *
document.querySelectorAll(".departments li"); *
```

## 间接查找 *

通过已找到的其他标签来查找。

```js
// 获取参照节点
p
// 1. 获取上一个兄弟节点
list.previousElementSibling;
list.previousSibling
// 2. 获取下一个兄弟节点
list.nextElementSibling
list.nextSibling
// 3. 获取父节点
list.parentElement
list.parentNode
// 4. 获取所有子节点
list.children   // → 获取所有元素子节点
list.firstElementChild // → 获取第一个元素子节点
list.lastElementChild) // → 获取最后一个元素子节点
list.childElementCount // → 获取子节点的个数
// 5. 获取第一个子节点
list.firstElementChild
// 5. 获取最后一个子节点
list.lastElementChild
```

## 其他查询

```js
// 01. 查找文档类型
document.doctype
// 02. 查找根节点
document.documentElement
// 03. 查找Window对象
document.defaultView
// 04. 查找head元素
document.head
// 05. 查找body元素
document.body
// 06. 查询页面中正在获取焦点的元素
document.activeElement
// 07. 获取页面所有的<a>
document.links
// 08. 获取页面所有的<form>
document.forms
// 09. 获取页面所有的<img>
document.images
// 10. 获取页面所有的<script>
document.scripts
// 11. 获取页面所有的<link>
document.styleSheets
// 12. 获取页面所有的<embeds>
document.embeds
// 13. 获取/设置网页标题
document.title *
```

# 节点操作 *

## 创建节点

```js
// 01. 创建元素节点
document.createElement(tagName);
// 02. 创建文本节点
document.createTextNode(content)
// 03. 创建属性节点
document.createAttribute(attrName);
// 04. 创建文本片段
document.createDocumentFragment();
```

> **！Tips**：当我们需要操作某个DOM时，可以将其克隆进文本片段，执行操作之后再挂载到元素上即可，这样可以优化性能，比如 Vue 模板编译原理就是使用文本片段操作DOM的。

```js
function nodeToFragment(el) {
  // 1. 创建 fragment 对象
  const fragment = document.createDocumentFragment();
  const child;
  // 2. 将原生节点移动到fragment中
  while ((child = el.firstChild)) {
    fragment.appendChild(child);
  }
  // 3. 返回 fragment
  return fragment;
}
```

## 操作属性

```js
// 1. 设置、修改、读取属性 *
el.setAttribute("href", "https://github.com/lihongyao");
el.setAttribute("target", "_blank");
el.getAttribute("href");
// 2. 判断指定属性是否存在 *
el.hasAttribute("href");
// 3. 移除指定属性 *
el.removeAttribute("target");
// 4. 获取所有属性
el.attributes;
// 5. 添加自定义属性“data-*” *
el.dataset.desc = "耀哥博客地址";
```

## 操作类名

```js
// 1. 通过classname操作类名 *
// - 设置类名
el.className = "link"; 
el.className = "link blog";
// - 访问类名
el.className;
// - 移除类名
el.className = "";

// 2. 通过classList操作类名 
// - 添加类名 *
el.classList.add("link");
el.classList.add("flag");
// - 移除类名 *
el.classList.remove("flag");
// - 查询是否包含某个类名 *
el.classList.contains("link"); // true
// - 查询指定位置的类名
el.classList.item(0); // link
// - 将类名集合转为字符串
el.classList.toString();
```

## 操作内容

```js
// 1. textContent
// - 设置
el.textContent = "China";
// - 读取
el.textContent 

// 2. innerHTML
// - 设置
el.innerHTML = "I love <mark>China</mark>";
// - 读取
el.innerHTML
```

> 提示：`textContent` 设置显示文本，不能识别 HTML标签，而 `innerHTML` 可以识别 HTML 标签。

## 插入节点

```js
// 1. 在指定元素内追加(后面)
tag.appendChild(el);
tag.append(el);

// 2. 在指定元素内追加(前面)
tag.prepend(el)

// 3. 在指定元素前加入
tag.before(el);
tag.insertBefore(el, 指定元素);

// 4. 在指定元素后加入
tag.after(el);

// 5. 在指定元素的指定位置加入
/*
insertAdjacentHTML
- beforebegin：在当前元素节点的前面。
- afterbegin：作为当前元素的第一个子元素插入。
- afterend：在当前元素节点的后面。
- beforeend：作为当前元素的最后一个子元素插入。*/
tag.insertAdjacentHTML("beforeend", "<h1>新插入的节点</h1>");
```

> 提示：`insertAdjacentHTML` 方法可以识别 `html` 标签。

## 操作样式

```js
// 1. 逐一赋值
el.style.color = "orange";
el.style.fontStyle = "italic";
el.style.letterSpacing = "8px";

// 2. 统一赋值
el.style.cssText = "color:orange;font-style:italic;letter-spacing:8px;";
```

判断浏览器是否支持某个样式属性，代码如下：

```js
if(el.style.color == undefined) {
    console.log("不支持color样式属性")  
}else {
    console.log("支持color样式属性") 
}
```

> 提示：通过脚本添加/读取的样式是行内样式。

## 替换节点

```js
// 1. 主动替换
tag.replaceWith(el);
// 2. 被动替换（通过父元素替换）
parent.replaceChild(el, child);
```

## 移除节点

```js
// 1. 主动移除
el.remove();

// 2. 被动移除（通过父元素移除）
parent.removeChild(el);
```

# 补充知识

```js
// 01. 获取元素的id
el.id;
// 02. 获取标签名称
el.tagName;
// 03. 获取内部标签结构（不包括自身）
el.innerHTML;
// 04. 获取内部标签结构（包括自身）
el.outerHTML;
// 05. 表单元素获取焦点
el.focus();
// 06. 滚动当前元素，进入浏览器的可见区域，参数true顶部对齐，false底部对齐
el.scrollIntoView();
// 07. 是否包含子节点
el.hasChildNodes();
// 08. 克隆节点，参数true，子节点同时克隆
el.cloneNode();
// 09. 是否包含某个子节点
el.contains();
// 10. 判断两个节点是否相等
el.isEqualNode();
```

# 表单操作

```js
// 1. 获取输入框输入的值
input.value

// 2. 获取单选值
radio.onchange = function() {
  console.log(this.value);
}

// 3. 获取select选中值
// - 单选
select.value
// - 多选
select.selectedOptions
```

# 拓展知识

## 获取非行间样式 *

```javascript
function getStyle(el, attr) {
	// 兼容IE
	if (el.currentStyle) {
		return el.currentStyle[attr];
	}else {
		return getComputedStyle(el, null)[attr];
	}
}
```

## 动态加载页面元素 *

在实际开发中，我们需要动态加载页面元素，首先我们需要在html页面中准备一个容器，比如列表：

```html
<ul class="list"></ul>
```

然后在脚本中根据数据动态加载`li`标签并添加至`ul`列表内部，具体实现如下：

```js
// 1. 数据封装（模拟后台返回的数据结构）
const data = [
  { name: "李白", position: "刺客", skill: "青莲剑歌", exp: 500 },
  { name: "貂蝉", position: "刺客/法师", skill: "绽·风华", exp: 350 },
  { name: "鲁班", position: "射手", skill: "空中支援", exp: 800 }
];

// 2. 获取容器
var list = document.querySelector(".list");
// 3. 遍历数据拼接li标签
var htmlStr = "";
data.forEach(function(hero) {
    htmlStr += `<li>
        <p class="name">英雄：${hero.name}</p>
        <p class="position">定位：${hero.position}</p>
        <p class="skill">技能：${hero.skill}</p>
        <p class="exp">熟练度：${hero.exp}</p>
    </li>`
})
// 4. 将拼出来的标签呈现在页面上
list.innerHTML = htmlStr;
```

## DOM 性能优化 *

[参考 >>](https://feclub.cn/post/content/dom)

通过js操作DOM的代价很高，影响页面性能的主要问题有如下几点：

- 访问和修改DOM元素；
- 修改DOM元素的样式，导致 **重绘** 或 **重排**；
- 通过对DOM元素的事件处理，完成与用户的交互功能；

> **重绘**：一些样式的修改，元素的位置和尺寸都没有改变。

> **重排**：元素的位置或尺寸发生了变化，浏览器需要重新计算渲染树，而新的渲染树建立后，浏览器会重新绘制受影响的元素。

页面重绘的速度要比页面重排的速度快，在页面交互中要尽量避免页面的重排操作。浏览器不会在js执行的时候更新DOM，而是会把这些DOM操作存放在一个队列中，在js执行完之后按顺序一次性执行完毕，因此在js执行过程中用户一直在被阻塞。

### 页面渲染过程

一个页面更新时，渲染过程大致如下：

![](./IMGS/page_renders.jpeg)

- JavaScript：通过js来制作动画效果或操作DOM实现交互效果
- Style：计算样式，如果元素的样式有改变，在这一步重新计算样式，并匹配到对应的DOM上
- Layout：根据上一步的DOM样式规则，重新进行布局（**重排**）
- Paint：在多个渲染层上，对新的布局重新绘制（**重绘**）
- Composite：将绘制好的多个渲染层合并，显示到屏幕上

在网页生成的时候，至少会进行一次布局和渲染，在后面用户的操作时，不断的进行重绘或重排，因此如果在js中存在很多DOM操作，就会不断地触发重绘或重排，影响页面性能。

### DOM操作对页面性能的影响

DOM 操作会影响页面性能，主要是因为它会导致 **重绘** 或 **重排**。为了减少这些影响，我们需要了解哪些操作会触发重绘和重排。

> **1）导致页面重排的操作**

- **内容变化**
  - 例如，文本内容变化或图片尺寸改变
- **元素几何属性变化**
  - 改变元素的宽高时，浏览器会重新计算并更新相关节点的位置，影响整个渲染树。
- **DOM 树结构变化**
  - 添加、删除或修改节点会导致整个 DOM 树的重排。如果在已有节点前添加新节点，后续所有元素都需要重新排版。
- **获取某些属性**
  - 获取如 offsetTop、offsetLeft、offsetWidth 等属性时，浏览器需要重排以计算这些值。
- **浏览器窗口尺寸变化**
  - 改变窗口大小会导致页面中元素尺寸调整，进而触发重排。

> **2）导致页面重绘的操作**

- **样式改变**
  - 修改影响外观的样式（如 color、background），不会改变元素的位置或大小，只有重绘发生。
- **重排会触发重绘**
  - 每次重排都会导致渲染树的变化，进而触发重绘。

### 高频操作DOM会导致的问题

接下来会分享一下在平时项目中由于高频操作DOM影响网页性能的问题。

#### 吸顶导航条相关及scroll滚动优化

**1）存在的问题**

吸顶导航条要求当页面滚动到某个区域时，对应该区域的导航条在设置的显示范围内保持吸顶显示。涉及到的操作：

- 监听页面的scroll事件
- 在页面滚动时进行计算和DOM操作
  - 计算：计算当前所在位置是否为对应导航条的显示范围
  - DOM操作：显示在范围内的导航条并且隐藏其他导航条

由于scroll事件被触发的频率高、间隔近，如果此时进行DOM操作或计算并且这些DOM操作和计算无法在下一次scroll事件发生前完成，就会造成掉帧、页面卡顿，影响用户体验。

**2）优化方案**

针对该项目中的问题，采取的解决方法是：

- 尽量控制DOM的显示或隐藏，而不是删除或添加：

  页面加载时根据当前页面中吸顶导航的数量复制对应的DOM，并且隐藏这些导航。当页面滚动到指定区域后，显示对应的导航。

- 一次性操作DOM：

  将复制的DOM存储到数组中，将该数组 append 到对应的父节点下，而不是根据复制得到DOM的数量依次循环插入到父节点下。

- 多做缓存

  如果某个节点将在后续进行多次操作，可以将该节点利用变量存储起来，而不是每次进行操作时都去查找一遍该节点。

- 使用 `requestAnimationFrame` 优化页面滚动：

  ```javascript
  // 在页面滚动时对显示范围进行计算
  // 延迟到整个dom加载完后再调用，并且异步到所有事件后执行
  $(function () {
    // animationShow 优化滚动效果，scrollShow 为实际计算显示范围及操作DOM的函数
    setTimeout(function () {
      window.Scroller.on('scrollend', animationShow);
      window.Scroller.on('scrollmove', animationShow);
    });
  });
  function animationShow() {
    return window.requestAnimationFrame
      ? window.requestAnimationFrame(scrollShow)
      : scrollShow();
  }
  ```

> 对于scroll的滚动优化还可以采用防抖（Debouncing）和节流（Throttling）的方式，但是防抖和节流的方式还是要借助于setTimeout，因此和requestAnimationFrame相比，还是requestAnimationFrame实现效果好一些。

### 性能优化方案

- 减少在循环内进行DOM操作，在循环外部进行DOM缓存
  - 避免使用 +=，将拼接元素放入数组通过 `join()` 方法效率更高
- 只控制DOM节点的显示或隐藏，而不是直接去改变DOM结构
- 操作DOM前，先把DOM节点删除或隐藏
- 最小化重绘和重排
  - 通过类名更新样式

## css 动画 vs. js 动画

1. 实现方式
   - **CSS 动画**：通过 `@keyframes` 或 `transition` 实现，声明式写法，适合简单动画（如渐变、旋转）。
   - **JS 动画**：通过 `requestAnimationFrame` 或动画库（如 GSAP）动态计算，适合复杂交互（如物理引擎、精确控制）。
2. 性能

   - **CSS 动画**：浏览器优化更好（GPU 加速），适合高频渲染（如 `transform`、`opacity`）。

   - **JS 动画**：可控性强，但频繁操作 DOM 可能导致性能问题（需优化）。
3. 控制能力
   - **CSS 动画**：控制有限（如 `animation-play-state`），难以动态调整参数。
   - **JS 动画**：可实时修改动画（暂停、变速、回调），适合游戏、复杂交互。

4. 兼容性
   - **CSS 动画**：现代浏览器支持良好，但旧版 IE 兼容性差。
   - **JS 动画**：可通过 polyfill 兼容旧浏览器，灵活性更高。

CSS 动画性能更好，适合简单效果；JS 动画控制灵活，适合复杂交互。优化时优先用 CSS `transform/opacity` 触发 GPU 加速，复杂场景用 `requestAnimationFrame` 或 GSAP。

# [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

接口提供了监视对DOM树所做更改的能力。

## API

[`disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/disconnect)

`阻止 MutationObserver` 实例继续接收的通知，直到再次调用其[`observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)方法，该观察者对象包含的回调函数都不会再被调用。

[`observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe)

配置`MutationObserver`在DOM更改匹配给定选项时，通过其回调函数开始接收通知。

[`takeRecords()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/takeRecords)

从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到[`MutationRecord`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)对象的新[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)中。

## 示例

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```















