# 概述

> The Browser Object Model(BOM) allows JavaScript to "talk to" the browser.

**BOM**（**B**rowers **O**bject **M**odel，浏览器对象模型）是浏览器为js提供的一个API（**A**pplication **P**rogramming **I**nterface，应用编程接口），所以它不是原生js提供的。通过BOM我们可以访问和设置浏览器的一些属性和函数。

BOM 的大部分操作都依赖于全局对象 window，由于它是全局对象，因此访问其子对象的属性和方法时可以省略 window，例如 window.console.log() 可简写为 console.log()。

## window 对象的主要子对象

- **document**：文档对象
- **frames**：浏览器的框架对象
- **history**：浏览器历史记录对象
- **location**：当前页面的位置信息
- **navigator**：浏览器信息对象
- **screen**：屏幕信息对象

此外，window 还提供了一些常见的方法，例如：

- alert()、open()、close()
- setTimeout()、clearTimeout()
- setInterval()、clearInterval()

虽然 BOM 没有官方标准，但随着 Web 发展，各大浏览器厂商已在许多 BOM 相关功能上达成共识，使得大多数现代浏览器都能支持常见的 BOM 操作。

## window 对象的多种表示方式

在全局环境下，以下变量都指向 window：

- **window**
- **this**
- **self**
- **frames**

在 Chrome 控制台输入 window.（注意最后的 .），可以查看 window 下的所有属性和方法。由于其包含大量内容，掌握全部并不现实，我们只需了解常用部分即可。

# 窗口属性 *

浏览器窗口的相关属性对于响应式设计至关重要，尤其是在支持从智能手表（160×160）到 4K 屏幕（4096×2160）的设备时，合理调整布局是前端开发中的难点。除了 CSS 框架，我们也可以借助 BOM 提供的窗口属性进行适配。

浏览器窗口相关的主要属性有以下（数值表示的单位统一为像素）:

![](./IMGS/rect.jpeg)

1. innerWidth、innerHeight：浏览器视口的宽高（包含滚动条）
2. outerWidth、outerHeight：浏览器窗口的整体宽高
3. pageXOffset、pageYOffset：页面滚动的偏移量（等价于 scrollLeft 和 scrollTop）
4. screenX、screenY（或 screenLeft、screenTop）：浏览器窗口相对于屏幕的坐标

> **注意**：innerWidth、innerHeight 等属性都包含滚动条的宽度，且这些属性是只读的，会随窗口大小变化而动态更新。

如果要隐藏滚动条，可以使用以下 CSS 代码：

```css
body::-webkit-scrollbar {
    display: none;
}
```

# 窗口方法 *

**基本窗口操作**

- `open(url?, target?)`：打开新窗口
- `close()`：关闭当前窗口

**其他窗口方法**

- `print()`：打印当前页面
- `getSelection() `：获取选中的文本

【实例 1】获取选中内容

```html
<div id="selText">
    <pre>曾经沧海难为水，除却巫山不是云。</pre>
    <pre>取次花丛懒回顾，半缘修道半缘君。</pre>
</div>
<p id="selRes">您选中的内容是：</p>
```

```js
const oDiv = document.querySelector('#selBox');
const oSel = document.querySelector('#selRes');
oDiv.onmouseup = function() {
    // 获取选中对象
    var selObj = getSelection();
    // 将选中对象转为字符串
    var selTxt = selObj.toString();
    oSel.innerHTML = "您选中的内容是：<b>“" + selTxt + "”</b>";
}
```

示例中使用 mouseup 事件来触发选中文本的获取。

# 窗口对象

## 1. document

document 主要用于操作 DOM，具体内容可参考标准 DOM 操作相关文档。

## 2. frames

在Ajax不盛行的年代，\<iframe> 标签是在页面内嵌入网站的最好选择，但随着js相关编程技术的高速发展，使用\<iframe>标签嵌套子页面的形式已经开始不被推荐，而是用Ajax的异步加载的形式去请求文档片段，这样可以使得页面不需要再去加载子页面内的整个CSS和js等文件，和一些不必要的标签（包括整个\<head>标签和文档声明）。这样一来就使得页面加载的速度得到很大提升，页面也不会因为跳转刷新出现短暂白屏的情况，从而使得用户体验得到提升。

不需要页面跳转，网站所有功能都通过一个页面完成的页面现在的术语叫法为 “*SPA*”（**S**ingle **P**age **A**pplication，译为：单页面应用程序。也有叫“SPWA”，其中的“W”表示“web”），是现在Web互联网应用开发的一个主流趋势。

## 3. Screen 

[Screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen)  对象提供当前设备屏幕的信息，所有属性均为只读：

![](./IMGS/bom_screen.png)

| 属性        | 描述                           |
| ----------- | ------------------------------ |
| availWidth  | 屏幕可用宽度（不包括任务栏等） |
| availHeight | 屏幕可用高度（不包括任务栏等） |
| colorDepth  | 颜色深度                       |
| pixelDepth  | 像素深度                       |
| width       | 屏幕宽度                       |
| height      | 屏幕高度                       |

另外，screenLeft/screenX 和 screenTop/screenY 记录浏览器窗口相对于屏幕的坐标，由于历史原因，IE 使用 screenLeft/screenTop，而其他浏览器使用 screenX/screenY，兼容性处理如下：

```js
const screenX = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
const screenY = window.screenTop !== undefined ? window.screenTop : window.screenY;
```

## 4. Navigator

[Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 对象包含浏览器详细信息，常用于设备兼容性检测。

**示例：判断设备类型**

```js
// 1. 判断是否为移动端
/Mobile/.test(navigator.userAgent);

// 2. 判断是否为 iOS 设备
/iOS/.test(navigator.userAgent);

// 3. 判断是否为 Android 设备
/Android/.test(navigator.userAgent);
```

## 5. Location

[Location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 提供当前页面的地址信息，可用于页面跳转、参数传递等。

![](./IMGS/bom_location.png)

【实例 1】**页面跳转**

```js
// 如果用户未登录，跳转至登录页面
if (!isLogin) {
    location.href = "./pages/login.html";
}
```

【实例 2】**传递 URL 参数**

在 A 页面：

```js
location.href = "../pages/B.html?id=1001&nums=2&color=black";
```

在 B 页面：

```js
console.log(location.search); // "?id=1001&nums=2&color=black"
```

解析参数：

```js
function parseQueryParams(searchStr) {
    if (!searchStr) return null;
    return Object.fromEntries(new URLSearchParams(searchStr));
}
```

## 6. History

[History >>](https://developer.mozilla.org/zh-CN/docs/Web/API/History)  允许操作浏览器历史记录

**主要属性**

- length：历史记录长度
- scrollRestoration：滚动恢复行为
- state：当前状态对象

**主要方法**

- `back()`：回到上一页
- `forward()`：前进到下一页
- `go(n)`：跳转到指定页（负数为后退，正数为前进）
- `pushState(state, title, url)`：添加历史记录
- `replaceState(state, title, url)`：替换当前历史记录

**示例：使用 pushState**

```js
history.pushState({ page: 1 }, "title 1", "?page=1");
```

