# JavaScript页面运行时构成过程

-  Web 应用的生命周期步骤
- 从 HTML 代码到 Web 页面的处理过程
- JavaScript 代码的执行顺序
- 与事件交互
- 事件循环

我们对 JavaScript 的探索从客户端 Web 应用开始，其代码也在浏览器提供的引擎上执行。为了打好后续对 JavaScript 语言和浏览器平台的学习基础，首先我们要理解 Web 应用的生命周期，尤其要理解 JavaScript 代码执行生命周期的所有环节。

你知道吗？

- 浏览器为什么总是会根据给定的 HTML 来渲染页面呢？
- Web 应用一次能处理多少事件呢？
- 为什么浏览器使用事件队列来处理事件？

## 生命周期概览

典型的客户端 Web 应用的生命周期从用户在浏览器中输入一串 URL 开始。

1. 用户：输入 URL

1. 浏览器：生成请求并发送至服务器；
1. 服务器：执行某些动作或获取某些资源，将响应发送回客户端；
1. 浏览器：处理 HTML、CSS 和 JavaScript，并构建结果页面；
1. 浏览器：监控事件队列，一次处理其中的一个事件；
1. 用户：与页面元素交互；
1. 用户：关闭 Web 页面；
1. 浏览器：应用生命周期结束；

从用户的角度来说，浏览器构建了发送至服务器的请求，该服务器处理了请求，并形成了一个通常由 HTML、CSS和 JavaScript 代码所组成的响应。当浏览器接收了响应时，我们的客户端应用开始了它的生命周期。其执行步骤如下：

- 页面构建——创建用户界面；
- 事件处理——进入循环从而等待事件的发生，发生后调用事件处理器；
- 应用的生命周期随着用户关掉页面而结束。

应用的生命周期随着用户关掉或离开页面而结束。现在来写一个简单的示例程序，每当用户移动鼠标或单击页面就会显示一条消息。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="first"></ul>

    <script>
        function addMessage(element, message) {
            var messageElement = document.createElement('li')
            messageElement.textContent = message
            element.appendChild(messageElement)
        }

        var firstElement = document.getElementById('first')
        addMessage(firstElement, 'foo bar')
    </script>
    <ul id="second"></ul>
    <script>
        document.body.addEventListener('mousemove', function(){
            var secondElement = document.getElementById('second')
            addMessage(secondElement, 'second mousemove')
        })
        document.body.addEventListener('click', function(){
            var secondElement = document.getElementById('second')
            addMessage(secondElement, 'second click')
        })
    </script>
</body>
</html>
```

## 页面构建阶段

在 Web 页面能被展示交互之前，其页面必须根据服务器获取的响应来构建。页面构建阶段是建立 Web 应用的 UI，其主要包括两个步骤：

1. 解析 HTML 代码并构建文档对象模型（DOM）
2. 执行 JavaScript 代码。

步骤 1 对在浏览器处理 HTML 节点的过程中执行，步骤二会在 HTML 解析一种特殊节点——脚本节点（包含或引用 JavaScript 代码的节点）时执行。页面构建过程中，这两个步骤会交替执行多次。

![](https://s2.loli.net/2022/03/21/KjHlSIi7Y3eXhPJ.png)

## HTML 解析和 DOM 构建

**页面构建始于浏览器接受 HTML 代码时，该阶段为浏览器构建页面 UI 的基础。通过解析收到的 HTML 代码，构建一个个 HTML 元素，构建 DOM。在这种时候对 HTML 结构化的表示形式中，每个 HTML 都被当作是一个节点。**

尽管 DOM 是根据 HTML 来创建的，两者紧密联系，但需要强调的是，它们两者并不相同。你可以把 HTML 代码看作是浏览器页面 UI 构建初始 DOM 的蓝图。为了正确的构建 DOM，浏览器还会修复它在蓝图中发现的问题。

```html
<html>
    <head>
        <p>
            test
        </p>
    </head>
    <body>
        
    </body>
</html>
```

这是一个无效的 HTML，页面中的 head 元素中错误的包含了一个 paragraph 的元素。**head 元素的一般用途是展示页面的总体信息：页面标题、字符编码和外部样式脚本**，而不是用于类似这里的定义页面内容。浏览器对于这个错误会进行修复，将段落元素的内容放置到页面内容中的 body 元素中，构造出正确的 DOM  

## 执行 JavaScript

所有包含在脚本元素中的 JavaScript 代码由浏览器的 JavaScript 引擎执行。由于**代码的主要目的是提供动态页面**，所以浏览器通过全局对象提供了一个 API 使 JavaScript 引擎可以与之交互，并改变页面的内容。

### JavaScript 中的全局对象

**浏览器暴露给 JavaScript 引擎的主要全局对象是 window 对象，它代表了一个页面的窗口。 window 对象是获取所有其他全局对象、全局变量和浏览器 API 的访问途径。**

全局 window 对象最重要的属性是 document，它代表了当前页面的 DOM，通过使用这个对象，JavaScript 代码就能在任何程度上改变 DOM，包括修改或移除现有的节点，以及创建和插入新的节点。

### JavaScript 代码的不同类型

从页面上来划分的话，JavaScript 代码可以分为两种不同类型的代码：全局代码和函数代码。

全局代码是指位于函数之外的代码，函数代码是指包含在函数中的代码。

```html
 <script>
        function addMessage(element, message) {
            var messageElement = document.createElement('li')
            messageElement.textContent = message
            element.appendChild(messageElement)
        }

        var firstElement = document.getElementById('first')
        addMessage(firstElement, 'foo bar')
</script>
```

这两类代码的主要不同是它们的位置：包含在函数内的代码叫做函数代码，而在所有函数以外的代码叫做全局代码。

这两种代码在执行中也有不同。**全局代码由 JavaScript 引擎以一种直接的方式自动执行，每当遇到这样的代码就一行接一行地执行。**

反过来，**若想执行函数代码，则必须被全局代码调用。**

> 注：从控制台也可以执行函数代码，这可以产生安全问题，尝试攻击别人网站的时候，可以试着从这里调用远程请求。

### 在页面构建阶段执行 JavaScript 代码

当浏览器在页面构建阶段遇到了脚本节点，它会停止 HTML 和 DOM 元素的构建，转而开始执行 JavaScript 代码，也就是执行包含脚本元素的全局 JavaScript ：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="first"></ul>

    <script>
        function addMessage(element, message) {
            var messageElement = document.createElement('li')
            messageElement.textContent = message
            element.appendChild(messageElement)
        }

        var firstElement = document.getElementById('first')
        addMessage(firstElement, 'foo bar')
    </script>  
</body>
</html>
```

我们来仔细的看看这个执行过程：

首先定义了一个 addMessage 函数

```js
function addMessage(element, message) {
    var messageElement = document.createElement('li')
    messageElement.textContent = message
    element.appendChild(messageElement)
}
```

然后通过全局 document 对象上的 getElementById 方法从 DOM 上获取了一个元素：

```js
  var firstElement = document.getElementById('first')
```

这段代码后紧跟着的是对 addMessage 的调用：

```js
addMessage(firstElement, 'foo bar')
```

这条代码创建了一个新的 li 元素，然后修改了其中的文字内容，最后将其插入 DOM 中。

在这个例子中，JavaScript 通过创建一个新元素并将其插入 DOM 节点修改了当前的 DOM 结构。一般而言，**JavaScript 代码能够在任何程度上修改 DOM 结构：它能创建新的接单或移除现有 DOM 节点。但它依然不能做某些事情，例如选择和修改还没创建的节点。这就是为什么要把 script 元素放在页面底部的原因。我们就不必担心是否某个 HTML 元素已经加载为 DOM。**

<u>一旦 JavaScript 引擎执行到了脚本元素中 JavaScript 代码的最后一行，浏览器就退出了 JavaScript 执行模式，并继续余下的 HTML 构建 DOM 节点。在这期间，如果浏览器再次遇到脚本元素，那么从 HTML 到 DOM 的构建再次暂停，JavaScript 运行环境开始执行余下 JavaScript 代码。需要注意的是：JavaScript 应用在此时依然会保持着全局状态。所以在某个 JavaScript 代码执行期间用户创建的全局变量能正常地被其他脚本元素中的 JavaScript 代码所访问。其原因在于全局 window 对象存在于整个页面的生存期之间，在它上面存储着所有 JavaScript 变量。只有还有没处理完的 HTML 元素和没执行完的 JavaScript 代码，下面两个步骤都会一直交替执行。</u>

- 将 HTML 构建为 DOM。
- 执行 JavaScript 代码。

最后，**当浏览器处理完所有 HTML 元素后，页面构建阶段就结束了。随后浏览器就会进入应用生命周期的第二部分：事件处理。**

### 事件处理

客户端 Web 应用是一种 GUI 应用，也就是这种应用对不同类型的事件作响应，如鼠标移动、单击和键盘按压等。因此，<u>在页面构建阶段执行的 JavaScript 代码，除了会影响全局应用状态和修改 DOM 外，还会注册事件监听器</u>（或处理器）。**这类监听器会在事件发生时，由浏览器调用执行**。有了这些事件处理器，我们的应用也就有了交互能力。在详细探讨注册事件处理之前，让我们先从头到尾看一遍事件处理器的总体思想。

### 事件处理器概览

浏览器执行环境的核心思想基于：**同一时刻只能执行一个代码片段，即所谓的单线程执行模型。想象一下在银行柜台前排队，每个人进入一支等待叫号并「处理」。但 JavaScript 则只开启了一个营业柜台！每当轮到某个顾客（某个事件），只能处理该位顾客。**

你所需要的仅仅一个营业柜台的职员为你处理工作，帮你订制全年的财务计划。当一个事件抵达后，浏览器需要执行相应的事件处理函数。这里不保证用户总会极富耐心地等待很长时间，直到下一个事件触发。所以，**浏览器需要一种方式来跟踪已经发生但尚未处理的事件。为了实现这个目标，浏览器使用了<u>事件队列</u>。**

**所有已生成的事件——无论是用户生成的，例如鼠标移动、点击，还是服务器生成的，例如 Ajax 事件，都会放在同一个事件队列里，以它们被浏览器检测到的顺序排列。**

- 浏览器检查事件列头；
- 如果浏览器没有在队列中检测到事件，则继续检查；
- <u>如果浏览器在队列头中检测到了事件，则取出该事件并执行相应的事件处理器。在这个过程中，余下的事件在事件队列中耐心等待，直到轮到它们被处理。</u>

*由于一次只能处理一个事件，所以我们必须格外注意处理所有事件的总时间。执行需要花费大量时间的事件函数会导致 Web 应用的无响应。*

重点注意浏览器在这个过程中的机制，其放置事件的队列是在页面构建阶段和事件处理阶段以外的。这个过程对于决定事件何时发生，并将其推入事件队列很重要 ，这个过程不会参与事件处理线程。

#### 事件是异步的

事件可能会以难以预料的时间和顺序发生——强调用户以某个顺序按键或点击是非常奇怪的。我们对事件的处理，以及处理函数的调用是异步的。如下类型的事件会在其他类型的事件中发生。

- 浏览器事件，当页面加载完或者无法加载时；
- 网络事件，例如 Ajax 事件和服务端事件；
- 用户事件，例如鼠标点击、鼠标移动等；
- 计时器事件，当 setTimeout 时间到期等。

Web 应用的 JavaScript 代码中，大部分都是对上述事件的处理！

事件处理的概念是 Web 应用的核心，代码的提前建立是为了在之后的某个时间执行。除了全局代码，页面中的大部分代码都将作为某个事件执行的结果。

在事件能被处理之前，代码必须要告知浏览器我们要处理特定事件。

### 注册事件处理器

事件处理器，是当某个特定事件发生后，我们希望执行的函数。为了达到这个目标，我们必须告诉浏览器我们要处理哪个事件。这个过程叫作注册事件处理器。在 Web 应用中，有两种方式注册事件：

- 通过把函数赋值给某个特殊属性
- 通过内置的 addEventListener 方法

例如，编写如下代码，将一个函数赋值给 window 对象上的某个特定属性 onload：

```js
window.onload = function(){}
```

通过这种方式，事件处理器就会注册到 load 事件上——当 DOM 已经就绪并全部构建完成，就会触发这个事件。类似的，如果我们想要为文档中的 body 元素注册点击事件，我们可以这么做：

```js
document.body.onClick = function(){}
```

把函数赋值给特殊属性是一种简单而直接的注册事件处理器的方式。但是，我并不推荐这种方式，因为这会带来一些缺点：**onClick 对于某个事件只能注册一个事件处理器，也就是说，会将上一个事件处理器覆盖掉。**

幸运的是，还有一种替代方案：addEventListener 方法让我们能够注册尽可能多的事件，只要我们需要的话。

```js
document.body.addEventListener('mousemove', function(){
    var secondElement = document.getElementById('second')
    addMessage(secondElement, 'second mousemove')
})
document.body.addEventListener('click', function(){
    var secondElement = document.getElementById('second')
    addMessage(secondElement, 'second click')
})
```

### 处理事件

事件处理的主要思想是：当事件发生时，浏览器调用相应的事件处理器。

**由于单线程执行模型，所以同一时刻只能处理同一个事件，任何后面的事件都只能在当前事件处理器完全结束执行后才能被处理。**

让我们再来看看上面的应用，为了响应用户的动作，浏览器把鼠标移动和单击事件以它们发生的顺序放入事件队列：

1. 第一个是鼠标移动事件
2. 第二个是鼠标点击事件

在事件处理阶段中，事件循环会检查队列，其发现队列的前面有一个鼠标移动事件，然后执行了相应的事件处理器序。当鼠标移动事件被事件处理器处理完毕后，轮到等待在事件队列中的点击事件。

当鼠标移动事件处理函数的最后一行代码执行完毕后，JavaScript 引擎退出事件处理器函数。事件循环再次检查队列。这一次，在队列的最前面，事件循环发现了鼠标单击事件并处理了该事件，一次单击处理器执行完成。

**队列中不再有新的事件，事件循环就会继续等待，等待新到来的事件。这个循环会一直执行到用户关闭了 Web 页面。**

## 小结

- 浏览器接收的 HTML 代码用作创建 DOM 的蓝图，它是客户端 Web 应用结构的内部展示

- 我们使用 JavaScript 代码来动态修改 DOM 以便给 Web 应用带来动态行为。
- 客户端 Web 应用的执行分为两个阶段：
  - 页面构建代码是用于创建 DOM 的，而全局 JavaScript 代码是遇到 script 节点时执行的。在这个过程中， JavaScript 代码能够以任意程度改变当前的 DOM，还能注册事件处理器。事件处理器是一种函数，当某个特定事件发生后会被执行。
  - 事件处理——**在同一时刻，只能处理不同事件中的一个**，处理顺序是事件生成的顺序。事件处理阶段大量依赖事件队列，**所有的事件都以其出现的顺序存储在事件队列中**。<u>事件循环会检查事件队列的队头，如果检测到了一个事件，那么相应的事件处理器就会被调用。</u>

