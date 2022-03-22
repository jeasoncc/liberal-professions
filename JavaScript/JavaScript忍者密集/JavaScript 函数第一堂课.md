- 理解函数为什么如此重要
- 函数为什么是第一类对象
- 定义函数的方式
- 参数赋值之迷

对于 JavaScript 了解与否，差别在于是否把 JavaScript 作为函数式语言来理解。对这一点的认知水平决定了你编写代码的水平。

JavaScript 中的函数才是你能唯一使用的一件重要武器。

JavaScript 中最关键的概念是：函数是第一类对象。函数与对象共存，函数也可以被视为其他任意类型的 JavaScript 对象。函数和那些更普通的 JavaScript 数据类型一样，它能被变量引用，能以字面量形式声明，甚至能被作为函数参数进行传递。

在需要调用某函数的位置定义该函数，能让我们编写更紧凑、更易懂的代码。

## 函数的不同点到底是什么？

函数是如此的重要，其原因之一在于函数是程序执行过程中主要的模块单元。除了全局 JavaScript 代码是在页面构建时执行的，我们编写的所有脚本代码都将在一个函数中执行。

由于我们大多数代码会作为函数来执行，因此，通过强大的构造器能赋予代码很大的灵活性和控制力。JavaScript 中对象有以下几种常用功能。

- 对象可通过字面量来创建。{ }
- 对象可以赋值给变量、数组或者其他对象的属性。

```js
var foo = {} // 为变量赋值一个对象
fooArray.push(foo) // 向数组中增加一个新对象
foo.data = {} // 给对象的属性赋值为一个新对象
```

- 对象可以作为参数传递给函数

```js
function hide(obj)  {
    obj.show = false
}
hide(foo) // 一个新创建的对象作为参数传递给函数
```

- 对象可以作为函数的返回值

```js
function fooObjFn() {
    return foo
} // 从函数中返回了一个对象
```

- 函数能够具有动态创建和分配的属性

```js
var foo = {}
foo.bar = 'foo bar' // 为对象分配一个新属性
```

不同于大多数其他的编程语言，在 JavaScript 中，我们几乎能够用函数来实现相同的事情。

### 函数是第一类对象

JavaScript 中函数拥有对象的所有能力，也因此函数可被作为任意其他类型对象来对待。当我们说函数是第一类对象的时候，也就是说函数也能实现以下这些功能：

- 通过字面量创建

```js
function fooFn() {}
```

- 赋值给变量、数组或其他对象的属性

```js
var fooFn = function() {} // 为变量赋值一个新函数
var fooArray = [fooFn] // 向数组中增加一个函数
fooFn.data = function() {} // 给函数对象的属性赋值一个新函数
```

- 作为参数来传递

```js
function call(fn) {
    fn()
}
call(fooFn) // 将函数作为参数传递给另外一个函数
```

- 作为函数的返回值

```js
function returnFn() {
    return fooFn
} // 返回一个函数
```

- 具有动态创建和分配的属性

```js
var fooFn = function () {}
fooFn.bar = 'bar'
```

对象能做的任何一件事，函数也能做。函数也是对象，唯一的特殊之处在于它是可调用的。

第一类对象的特点之一是，它能够作为参数传入函数。对于函数而言，这项特性也表明：如果我们将某个函数作为参数传入另一个函数，传入函数会在应用程序执行的未来某个时间点才执行，也就是我们所熟知的回调函数。

### 回调函数

每当我们建立了一个将在随后调用的函数时，无论是在事件处理阶段通过浏览器还是其他代码，我们都是在建立一个回调。这个术语源自这样一个事实，即在执行过程中，我们建立的函数会被其他函数在稍后的某个合适时间点「再回来调用」。

有效运用 JavaScript 的关键在于回调函数。

我来用一个简单的例子阐明这个概念，此例中的函数完全没有什么实际用处，它的参数接受另外一个函数，并作为回调函数调用该函数。

```js
function callbackFn (fn) {
    return fn()
}
```

这个函数可能没有什么用，但它反映了函数的一种能力，即将函数作为另一个函数的参数。

```js
var text = 'foo bar'
report('before')

function callBackFn(fn) {
    report('in use')
    return fn()
}

function getText() {
    report(' in getText fn')
    return text
}

report("before making all the calls")
assert(callBackFn(getText) === text, 'the callBackFn works!' + text)
report('after')
```



![image-20220321164252300](https://s2.loli.net/2022/03/21/eXjrRtuZyzhDafN.png)

## 函数作为对象的乐趣

```js
var foo = {}
foo.bar  = 'foo bar'

var fooFn = function() {}
fooFn.bar = 'bar'
```

来看看这种特性所能做的更有趣的事：

- 在集合中存储函数使我们轻易管理相关联的函数。
- 记忆函数能记住上次计算得到的值，从而提高后续调用的性能。

### 存储函数

某些例子中，我们会存储元素唯一的函数集合。当我们向这样的集合添加函数时，会面临两个问题：

- 哪个函数对于这个集合来说是一个新函数，从而需要被加入到该集合中？
- 又是哪个函数已经存在于集合中，从而不需要再次加入到集合中？

一般来说，管理回调函数集合时，我们并不希望存在重复函数，否则一个事件会导致同一个回调函数被调用多次。

一种显著有效的方法是把所有函数存入同一个数组，通过循环数组来检查重复函数。令人遗憾的是，这种方法的性能较差，作为一个技术专家，不仅仅是能用，而要干的漂亮。我们可以用函数的属性，用适当的负责度来实现它。

```js
var store = {
    nextId: 1,
    cache: {},
    add: function(fn){
        if(!fn.id) {
            fn.id = this.nextId++
            this.cache[fn.id] = fn
            return true
        }
    }
}

function fooFn() {}

assert(store.add(fooFn), 'Function was safely added')
assert(!store.add(fooFn), 'But it was only added once.')
assert(!store.add(fooFn), 'But it was only added once.')
assert(!store.add(fooFn), 'But it was only added once.')

console.log(store)
```

在这个清单里，我们创建了一个对象赋值给 stroe，这个变量中存储的是唯一的函数集合。这个对象有两个属性：

- 其一是下一个可用的 ID
- 另一个是缓存着已经保存的函数。

函数通过 add 方法添加到缓存中。

在 add 函数内，我们首先检查函数是否存在 id，如果当前函数已经有 id 属性，我们则假设该函数已经被处理过了，从而忽略该函数，否则为该函数分配一个 id 属性，并将该函数作为一个属性增加到 cache 上，id 作为属性名。紧接着该函数的返回值为 true，从而得知了调用 add 后，函数是什么时候添加到存储中。

![image-20220321165922522](https://s2.loli.net/2022/03/21/HdTI3txBZAcjMU9.png)

### 自记忆函数

自记忆是一种函数的处理过程，能够记住上次计算的结果。当函数计算得到结果时，就将结果按照参数存储起来。采用这种方式时，如果另外一个调用也使用相同的参数，我们则可以直接返回上次存储的结果，而不是再计算一遍。

**像这样避免重复计算的方式，可以显著提高性能。**对于动画中的计算、搜索，等不经常变化的数据，或任何耗时的数学计算来说，自记忆这种方式非常的有用。

这是一个简单的算法来计算素数。从外表上来说，这个函数和任何普通的函数一样，但在内部我们会构建一个结果缓存，它会每次保存计算得到的结果。

```js
function isPrime(value) {
    // 创建缓存
    if(!isPrime.answer) {
        isPrime.answer = {}
    }
    // 检查缓存的值
    if(isPrime.answer[value] !== undefined) {
        return isPrime.answer[value]
    }

    var prime = value !== 0 && value !== 1
    for (let i = 2; i < value; i++) {
        if(value % i === 0) {
            prime = false
        }
        
    }
    // 存储计算的值
    return isPrime.answer[value] = prime
}

assert(isPrime(5), '5 is prime')
assert(isPrime(7), '6 is prime')
assert(isPrime.answer[5], 'the answer is chched')
assert(isPrime.answer[7], 'the answer is chched')
console.log(isPrime)
```

在 isPrime 函数中，首先通过检查它的 answers 属性来确定是否已经创建了一个缓存，如果没有，则创建一个：

```js
// 创建缓存
if(!isPrime.answer) {
    isPrime.answer = {}
}
```

只有第一次调用时才会创建这个初始化空对象，之后这个缓存就已经存在了。然后我们会检查参数中传的值是否已经存储到缓存中：

```js
// 检查缓存的值
if(isPrime.answer[value] !== undefined) {
    return isPrime.answer[value]
}
```

这个缓存会针对参数中的值 value 来存储该值是否为素数，如果我们在该缓存中找到该值，函数会直接返回。

```js
return isPrime.answer[value]
```

这个缓存是函数自身的一个属性，所以只要函数还存在，缓存也就存在。

最后的测试结果可以看到函数在自记忆生效了。

![image-20220321172813301](https://s2.loli.net/2022/03/21/mYCq39WtLHnrOv5.png)

这个方法有两个优点：

- 由于函数调用时会寻找之前调用所得到的值，所以用户最终会乐于看到所获得的性能收益。
- 它几乎是无缝的发生在工作后台，最终用户和页面作者都不需要执行任何特殊的请求，也不需要做任何额外的初始化，就能顺利的工作。

当然，这种做法并不完美，还是要权衡利弊。

- 任何类型的缓存，都必然为性能牺牲内存。
- 缓存逻辑和业务逻辑混合。
- 对于这类问题很难做负载测试或算法复杂度估算，因为结果依赖于函数之前的输入。

## 函数定义

JavaScript 函数通常由函数字面量来创建函数值，就像数字字面量创建一个数字值一样。作为第一类对象，函数是可以用在编程语言中的值，就像字符串或者数字的值一样。

JavaScript 提供了集中定义函数的方式。

- 函数定义和函数表达式——最常用，人们通常不会独立地看待他们。
- 箭头函数——能让我们以尽量简洁的语法定义函数。
- 函数构造器——一种不常用的函数定义方式，以一种字符串的方式动态构造一个函数，这调用了 eval 方法，会造成性能和安全问题。
- 生成器函数——能创建出不同于普通函数的函数，在应用程序执行过程中，这种函数能够退出再重新进入，在这之间保留函数内变量的值。

理解这几种方式的不同很重要，因为函数创建的方式很大程度上函数可不调用的时间、函数的行为以及函数在哪个对象上可被调用。

### 函数声明和函数表达式

JavaScript 中定义函数最常用的方式是函数声明和函数表达式，这两种方式非常相似，它们之间还是有些微妙的差别。

#### 函数声明

JavaScript 定义函数最基本的方式是函数声明，每个函数声明都以强制性的 function 开头，其后紧跟着强制性的函数名，以及括号和括号内一列分隔的可选参数名。函数是一列可以为空的表达式，这些表达式必须包括在花括号内，除了这种形式以外，每个函数声明还必须包括一个条件：**作为一个单独的 JavaScript 语句，函数声明必须独立。**

```js
// 在全局代码中定义 foo 函数
function foo() {
    return 'foo'
}
// 在全局代码中定义 bar 函数
function bar() {
    // 在 bar 函数内部定义 koo 函数
    function koo() {
        return 'koo'
    }
    return koo()
}
```

如果你对函数语言没有太多了解，仔细看一看，你可能会发现你并不习惯这种方式：一个函数被定义在另一个函数当中。

```js
// 在全局代码中定义 bar 函数
function bar() {
    // 在 bar 函数内部定义 koo 函数
    function koo() {
        return 'koo'
    }
    return koo()
}
```

在 JavaScript 中，这是一种非常通用的方式，这里用它作为例子是为了再次强调 JavaScript 中函数的重要性。	

#### 函数表达式

JavaScript 中的函数是第一类对象，除此之外也就意味着它们可以通过字面量创建，可以赋值给变量和属性，可以作为传递给其他函数的参数或函数的返回值。正因为函数有如此的基础结构，所以 JavaScript 能让我们把函数和其他表达式同等看待。

```js
var a = 3
myFunction(4)
```

同样，在相同位置可以用函数字面量。

```js
var a = function(){}
myFunction(function() {})
```

**这种总是其他表达式一部分的函数（作为赋值表达式的右值，或者作为其他函数的参数）叫做函数表达式**。函数表达式非常重要，在于它能准确地在我们需要使用的地方定义函数，这个过程让代码易于了解。

```js
// 独立的函数声明
function myfn() {
    // 	内部函数声明
    function infn(){}
}

// 函数表达式作为变量声明赋值语句中的一部分
var myFnc = function(){}

// 函数表达式作为第一次函数调用中的参数
myfn(function(){
    // 函数表达式作为函数返回值
    return function(){}
})

// 作为函数调用的一部分，命名函数表达式会被立即调用
(function nameFn() {})()
```

从上面的代码中可以看到，函数声明是如何作为 JavaScript 代码中的独立表达式的，但它能够包含在其他函数内，与之比较的是函数表达式，它通常作为其他语句的一部分。它们被放在表达式级别，作为变量声明的右值。

```js
// 函数表达式作为变量声明赋值语句中的一部分
var myFnc = function(){}
```

或者作为另一个函数调用的参数或返回值

```js
// 函数表达式作为第一次函数调用中的参数
myfn(function(){
    // 函数表达式作为函数返回值
    return function(){}
})
```

函数声明和函数表达式除了在代码中的位置不同之外，还有一个更重要的不同点是：**对于函数声明来说，函数名是强制性的，而对于函数表达式来说，函数名完全是可选的。**

函数声明必须具有函数名是因为它们是独立语句，一个函数的基本要求是它应该能够被调用，所以它必须具有一种被饮用的方式，于是唯一的方式就是通过它的名字。

从另一方面来说，函数表达式也是其他 JavaScript 表达式的一部分，所以我们也就具备了调用它们的替代方案。如果一个函数被赋值给了一个变量，我们就具备了用变量来调用函数。

```js
var doNothing = function(){}
doNhing()
```

或者，如果它是另外一个函数的参数，我们可以在该函数中通过相应的参数名来调用它。

```js
function doSomething(action){
    action()
}
```

#### 立即函数

```js
// 函数表达式的立即调用
(function() {})(3)
```

我们首先创建了一个函数，然后立即调用这个新创建的函数。这种函数叫做<u>立即调用函数表达式（IIFE）,简称为立即函数</u>。**这一特性内能够模拟 JavaScript 中的模块化**，它是 JavaScript 开发中的重要理念。

