# JavaScript 函数

> 人对上帝说：「我……似乎看不到希望了」
>
> 上帝于是指着宇宙苍穹。
>
> 「你看，这都是我给你的希望」

**JavaScript 中最好的特性就是它对函数的实现**，它几乎无所不能。但是，相比你也能预料到，函数在 JavaScript 里也并非万能药。

函数包含一组语句，它们是 JavaScript 的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为。一般来说，<u>所谓编程就是将一组需求分解成一组函数与数据结构的技能。</u>

## 函数对象

在 JavaScript 中函数就是对象。对象是 「名/值」对集合并拥有一个连到原型对象的隐藏连接。**对象字面量产生的对象连接到 Object.prototype** 。<u>函数对象连接到 Function.prototype，Function.prototype 的原型对象是 Object.prototype</u>。每个函数在创建时附有两个附加的隐藏属性：函数的上下文和实现函数行为的代码。

每个函数对象在创建时也随带有一个 prototype 属性。它的值是一个拥有 constructor 属性且值为该函数的对象。这和隐藏连接到 Funtion.prototype 完全不同。

因为函数是对象，所以它们可以像任何其他的值一样被使用。函数可以存放变量、对象和数组中，函数可以被当作参数传递给其他的函数，函数也可以返回函数，而且，因为函数是对象，所有函数可以拥有方法。

**函数的与众不同之处在于它们可以被调用。**

## 函数

函数对象可以通过函数字面量来创建。

```js
var add  = function (a, b) {
    return a + b
}
```

函数字面量包括四个部分，第一个部分是保留字 function

第二个部分是函数名，它可以被省略。**函数可以用它的名字来递归地调用自己**。此名字也能被调试器和开发函数用来识别函数 。如果没有给函数命名，比如上面这个例子，它会被认为是匿名函数。

函数的第三部分是包围在圆括号中的一组函数，其中每个参数用逗号分隔。**这些名称将被定义为函数中的变量。它们不像普通变量那样被初始化为 undefined ，而是在函数被调用时初始化为实际提供的参数值。**

第四部分是包围在花括号中的一组语句。这些语句是函数的主体，它们在函数被调用时执行。

函数字面量可以出现再任何允许表达式出现的地方。**函数也可以被定义在其他函数中。一个内部函数自然可以访问自己的参数和变量，同时它也能方便的访问嵌套在其中的那个函数的参数和变量。通过函数字面量创建的函数对象包含一个连到外部上下文的连接，这被称为闭包。它就 JavaScript 强大表现力的根基。**

> 闭包就是内部函数访问外部函数参数和变量的一种方式，打通了内部函数连接到外部函数上下文的连接。

## 调用

调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数。

除了声明时定义的形式参数，**每个函数接收两个附加的参数：this 和 arguments**。<u>参数 this 在面向对象编程中非常重要，它的值取决于调用的模式</u>。在 JavaScript 中一共有四种调用模式：方法调用模式、函数调用模式、构造器调用模式和 apply 调用模式。这些模式在如何初始化关键参数 this 上存在差异。

- 方法调用模式
- 函数调用模式
- 构造器调用模式
- apply 调用模式 

调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号。圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值。每个参数值被赋予函数声明定义的形式参数名。当实际参数的个数与形式参数的个数不匹配时不会导致运行时错误。

**如果实际参数过多了，超出的参数值将被忽略。如果实际参数值过少，缺少的值将会被替换为 undefined**。<u>对参数值不会进行类型检查：任何类型的值都可以被传递给参数。</u>

### 方法调用模式

当一个函数被保存为对象的一个属性时，我们称它为一个方法。<u>当一个方法被调用的时候，this 被绑定到该对象。</u>如果一个调用表达式包含一个属性存取表达式（ 即一个 . 表达式或 [ subscript ]下标表达式 ），那么它当作一个方法来调用。

```javascript
var myobject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1
    }
}
myobject.increment()
document.writeln(myobject.value)

myobject.increment(2)
document.writeln(myobject.value)
```

**方法可以使用 this 去访问对象，所以它能从对象中取值或者修改该对象。this 到对象的绑定发生在调用的时候。这个「超级」迟绑定使得函数可以对 this 高度复用。通过 this 可取得它们所属对象的上下文的方法称为公共方法。**

### 函数调用模式

当一个函数并非一个对象的属性时，那么它被当作一个函数来调用：

```js
var sum = add(3, 4)
```

**当函数以此模式调用时， this 被绑定到全局对象，这是语言设计上的一个错误**。倘若语言设计正确，当内部函数被调用的时候，this 应该仍然被绑定到外部函数的 this 变量。这个设计错误的后果是方法不能利用内部函数来帮助它工作，因为内部函数的 this 值绑定了错误的值，所以不能共享该方法对对象的访问权。幸运的是，有一个很容易的解决方案：**如果该方法定义一个变量并给它赋值为 this，那么内部函数就可以通过那个变量访问到 this。**

```js
myobject.double = function () {
    var that = this

    var helper = function() {
        that.value = add(that.value, that.value)
    }
    helper()
}

myobject.double()
document.writeln(myobject.value)
```

### 构造器调用模式

**JavaScript 是一门基于原型继承的语言。**

这意味着对象可以直接从其他对象继承属性。该语言是无类别的。

这偏离了当今编程语言的主流。当今大多数语言都是基于类的语言。<u>尽管原型继承有着强大的表现力，但它并不广泛理解</u>。*JavaScript 本身对其原型的本质也缺乏信心，所以它提供了一套和基于类的语言类似的对象构建语法*。

有类型化语言编程经验的程序员们很少有愿意接受原型继承的，接受原型继承的则认为借鉴类型化语言的语法模糊了这门语言真实的原型本质，真是两边都不讨好。

**如果在一个函数前面带上 new 来调用，那么将创建一个隐藏连接到该函数的 prototype 成员的新对象，同时 this 将会被绑定到那个新对象上。**

new 前缀也会改变 return 语句的行为。

```js
// 创建一个名为 Quo 的构造器函数，它构造了一个带有 status 属性的对象。
var Quo = function (string) {
    this.staus = string
}

// 给 Quo 的所有实例提供一个名为 get_status 的公共方法
Quo.prototype.get_status = function() {
    return this.staus
}

// 构造一个 Quo 实例
var myQuo = new Quo("confused")
document.writeln(myQuo.get_status())
```

**目的就是结合 new 前缀调用的函数被称为构造函数**，按照约定，它们保存在以大写格式命名的变量里，如果调用构造器函数时没有在前面加上 new，可能会发生非常糟糕的事情，既没有编译时警告，也没有运行时警告，所以大写约定非常重要。

我不推荐使用这种形式的构造函数。

### Apply 调用模式

因为 JavaScript 是一门函数式的面向对象变成语言，所以函数可以拥有方法。

apply 方法让我们构建一个参数数组并用其他去调用函数。它也允许我们选择 this 的值。apply 方法接收两个参数，第一个是将绑定给 this 的值，第二个就是一个参数数组。

```js
// 构建一个包含两个数字的数组，并将它们相加
var array = [3, 5]
var sum = add.apply(null, array) // sum 值为 8 
// 构造一个包含 status 成员的对象
var statusObject = {
    staus: 'A-OK'
}
// statusObject 并没有继承自 Quo.prototype, 但我们可以在 statsObject 上调
// 用 get_status 方法，尽管 statusObject 并没有一个名为 get_status 的方法
var status = Quo.prototype.get_status.apply(statusObject);
console.log(status)
```

### 参数

当函数被调用时，会得到一个「免费」奉送的参数，那就是 arguments 数组。通过它函数可以访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形式参数的多余参数，这使得编写一个无须指定参数个数的函数成为可能。

```js
// 构造一个将很多个值相加的函数
// 注意该函数内部定义的变量 sum 不会与函数外部定义的 sum 值产生冲突
// 该函数只会看到内部的那个变量

var sum = function () {
    var sum = 0
    for (let index = 0; index < arguments.length; index++) {
        const element = arguments[index];
        sum += element    
    }
    return sum
}
document.writeln(sum(4, 8, 16, 23, 42))
```

这不是一个特别有用的模式，我们将会看到如何给数组添加一个相似的方法来达到同样的效果。

**因为语言设计的一个错误， arguments 并不是一个真正的数组，它只是一个「类似数组」的对象。 arguments 拥有一个 length 属性，但它缺少所有的数组方法。**

### 返回

当一个函数被调用时，它从函数第一个语句开始执行，并在遇到关闭函数体的时结束。那使得函数把控制权交还给调用该函数的程序部分。

return 语句可用来使函数来提前返回。当 return 被执行时，函数立即返回而不再执行余下的语句。

一个函数总是返回一个值，如果没有指定返回值，则返回 undefined。

如果函数以前面加上 new 前缀的方式来调用，且返回值不是一个对象，则返回 this 。

### 异常

JavaScript 提供了一套异常处理机制。异常是干扰程序的正常流程的非正常的事故。当查出这样的事故时，你的程序应抛弃一个异常。

```js
var add = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: "TypeError",
            message: 'add needs numbers'
        };
    }
    return a + b
}
```

throw 语句中断函数的执行，它应该抛出一个 exception 对象，该对象包含可识别异常类型的 name 属性和一个描述性的 message 属性。你也可以添加其他的属性。

该 exception 对象将被传递到一个 try 语句的 catch 从句。

```js
// 构造一个 try_it 函数，用不正确的方式调用之前的 add 函数
var try_it = function() {
    try {
        add('seven')
    } catch (error) {
        document.writeln(e.name + ":" + e.message)
    }
}
```

**如果在 try 代码块抛出一个异常，控制权就跳转到它的 catch 从句。**

一个 try 语句只会有一个将捕所有异常的 catch 代码块。<u>如果你的处理手段取决于异常的类型，那么异常处理必须检查异常对象的 name 属性以确定异常的类型。</u>

### 给类型增加方法

JavaScript 允许给语言的基本类型增加方法。我们已经看到，通过给 Object.prototype 添加方法来使得该方法对所有对象可用。这样的方式对函数、数组、字符串、数字、正则表达式和布尔值同样适用。

我们可以通过给 Function.prototype 增加方法来使得该方法对所有函数可用：

```js
Function.prototype.method = function(name, func) {
    this.prototype[name] = func
    return this
}
```

通过给 Function.prototype 增加一个 method 方法，我们就不必键入 prototype 这个属性名，这个缺点也被掩盖了。

JavaScript 并没有单独的整数类型，因此有时候只提取数字中的整数部分是必要的。JavaScript 本身提供的取整方法有些丑陋。我们可以通过给 Number.prototype 添加一个 integer 方法来改善它。它会根据数字的正负来判断使用 Math.celling 还是 Math.floor。

```js
Number.integer =  function() {
    return Math[this < 0 ? 'celling' : 'floor'](this)
}
Number.method('integer', function () {
    return Math[this < 0 ? 'ceiling': 'floor'][this]
})
document.writeln((-10 / 3).integer())

String.method('trim', function () {
    return this.replace(/^s + | \s + $/g, '')
})
```

通过给基本类型增加方法，我们可以大大提高语言的表现能力，因为 JavaScript 原型继承的动态本质，新的方法立刻被赋予到所有值上，哪怕值是在方法被创建之前就创建好了。

基本类型的原型是公共的结构，所以在类库混用时务必要小心。一个保险的做法就是只在确定没有该方法时才添加它。

另外一个要注意就是 for in 语句用在原型上时表现很糟糕。我们可以用 hasOwnProperty 方法筛选出继承而来的属性，或者我们可以查找特定的类型。

### 递归

递归函数会直接或间接地调用自身的一种函数。递归是一种强大的编程技术，它将一个问题分解为一组相似的子问题，每一个都用寻常解去解决。一般来说，一个递归函数调用自身去解决它的子问题。



### 作用域

在变成语言中，作用域控制变量与参数的可见性及生命周期。对程序员来说，这是一个重要的帮助，因为它减少了名称冲突，并且提供了自动内存管理。

```js
var foo = function() {
    var a = 3, b=5;
    var bar = function() {
        var b = 7, c= 11
        a += b + c
    }
    bar();
    console.log(a)
    console.log(b)
    console.log(c)
}

foo()
```

大多数使用 C 语言语法的语言都拥有块级作用域。在一个代码块之中定义的所有变量在代码块的外部是不可见的。定义在代码块中的变量在代码块执行结束后会被立即释放掉。

糟糕的是，尽管代码块的语法似乎表现了它支持块级作用域，但实际上 JavaScript 并不支持。这个混淆之处可能成为错误之源。

**JavaScript 之中确实有函数作用域，那意味着定义在函数这的参数和变量在函数外部是不可见的，而且在一个函数的任何位置定义的变量，在函数的任何地方都可见。**

> JavaScript 中没有块级作用域，只要函数作用域

很多现代的语言都推荐尽可能迟的声明变量，而用在 JavaScript 上的话，却会成为糟糕的建议，因为它缺少块级作用域。所以，最好的做法是在顶部，声明函数中可能用到的所有变量。

### 闭包

作用域的好处是内部函数可以访问定义在它们外部函数的参数和变量。

```js
var myobject = function () {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1
        },
        getValue: function() {
            return value
        }
    }
}();
 
myobject.increment()
myobject.increment()
myobject.increment()
myobject.increment()
myobject.increment()
myobject.increment()
console.log(myobject.getValue())
```

我们并没有把函数赋值给 myobject，而是把调用该函数后返回的结果赋值给它。注意最后一行（）。该函数返回一个包含两个方法的对象，并且这些方法继续享有访问 value 变量的特权。

```js
// 创建一个名为 quo 的构造函数。
// 它构造出带有 get_status 方法和 status 私有属性的一个对象

var quo = function (status) {
    return {
        get_status: function () {
            return status
        }
    }
}

// 构造一个实例
var myQuo = quo("amazing")
document.writeln(myQuo.get_status())
```

这个 quo 函数被设计成无须在前面加 new 来使用，所以名字也没有首字母大写。当我们调用 quo 时，它返回包含 get_status 方法的一个新对象。该对象的一个引用保存在 myQuo 中，即使 quo 已经返回了，但 get_status 方法仍然享有 quo 对象的 status 属性的特权。 get_status 方法并不是访问该参数的一个拷贝。它访问的就是该参数本身。这是可能的，因为该函数可以访问它本创建时所处的上下文环境，这被称之为闭包。

> 即便是外部函数已经执行完成，内部函数依然可以访问外部函数的上下文环境。

让我们来看看一个更有趣的例子：

```js
//  定义一个函数，它设置了一个 DOM 节点为黄色，然后把它渐变为白色
var fade = function(node) {
    var level = 1;
    var step = function() {
        debugger
        var hex = level.toString(16)
        node.style.backgroundColor = '#FFFF' + hex + hex
        if(level < 15) {
            level += 1;
            setTimeout(step, 1000);
        }
    }
    setTimeout(step, 1000);
}

fade(document.body)
```

我们调用 fade，把document.body 作为参数传递给它。 fade 函数设置 level 为 1，它定义了一个 step 函数，接着调用  setTimeout，并传递 step 函数和一个时间给它，然后它返回， fade 函数结束。

在大约十分之一秒后 step 函数被调用，它把 fade 函数的 level 变量转化为 16 位字符。接着，它修改 fade 函数得到节点的背景颜色。然后查看 fade 函数的 level 变量，如果背景色尚未变成白色，那么它增大 fade 函数的 level 变量和用 setTimeout 预定让它自己再次运行。

step 函数很快再次被调用。但这次， fade 函数的 level 变量值变为 2，fade 函数在之前已经返回了，但只要 fade 内部函数需要，它的变量就会持续保留。

> 内部函数能访问外部函数的实际变量而无须复制是很重要的。

### 回调

函数可以让不连续事件的处理变得更加容易。假定有这么一个序列，由用户交互开始，向服务器发送请求，最终显示服务器的响应，最淳朴的写法可能会是这样：

```js
request = prepare_the_request()

reponse = send_request_synchronsly(request)

display(response)
```

这种方式的问题在于网络的同步请求将会导致客户端进入假死状态。如果网络传输或服务器很慢，响应性的降低是不可接受的。

更好的方式是发起异步的请求，提供一个当服务器的响应到达时将被调用的回调函数。异步的函数立即返回，这样客户端不会被阻塞。

```js
request = prepare_the_request()
send_request_asynchronously =(request, function(response) {
    display(response)
})

```

我们传递一个函数为参数给 send_request_asynchronously 函数，它将在收到响应时被调用。

### 模块

我们可以使用函数和闭包来构造模块，模块是一个提供接口却隐藏状态与现实的函数或对象。通过使用函数去产生模块，我们几乎可以完全摒弃全局变量的使用，从而缓解这个 JavaScript 这个最糟糕的特性所带来的影响。

假定我们想要给 String 增加一个 deentityify 方法，它的任务是寻找字符串中 HTML 字符串并替换它们对应的字符。 在一个对象中保存字符的名字和它们对应的字符是有意义的。但我们该在哪里保存该对象呢？我们可以把它放到一个全局变量中，但全局变量是魔鬼。我们可以把它定义在该函数本身，但是那有运行时的损耗，因为该函数在每次被执行的时候该字面量都会被求值一次。理想的方式是将其放入一个闭包，而且也许还能提供一个增加更多字符实体的扩展方法。

```js
var deentityify = (function() {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    }
    return function() {
        return  this.replace(/&([^&;]+);/g),
        function(a,b) {
            var r  = entity[b]
            return typeof r === 'string' ? r : a 
        }
    }

})()
```

请注意最后一行，我们用()运算法立刻调用我们刚刚构造出来的函数，这个调用所创建并返回的函数才是 deentityify 方法。

模块模式利用了函数作用域和闭包来创建绑定对象与私有成员的关联，在这个例子中，只有 deentityify 方法有权访问字符实体表这个数据对象。

模块模式的一般形式是：一个定义了私有变量和函数的函数；

利用闭包创建可以访问私有变量和函数的特权函数，最后返回这个特权函数，或者把它们保存到一个可访问到的地方。

**使用模块模式就可以摒弃全局变量的使用，它促进了信息隐藏和其他优秀的设计实践**。对于应用程序的封装，或者构造其他单例对象，模块模式非常有效。

模块模式也可以用来产生安全的对象，假定我们想要构造一个用来产生序列号的对象。

```js
var serial_maker = function () {
    // 返回一个产生唯一一个字符串的对象
    // 唯一字符串由两部分组成，前缀 + 序列号
    // 该对象包含一个设置前缀的方法 + 一个设置序列号的方法

    // 和一个产生一个字符串的 gensym 方法
    var prefix = ''
    var seq = 0
    return {
        set_prefix: function(p) {
            prefix = String(p)

        },
        seq_seq: function (s) {
            seq = s 
        },
        gensym: function () {
            var result= prefix + seq;
            seq += 1;
            return result
        }
    }
}

var seqer = serial_maker()
seqer.set_prefix('Q')
seqer.seq_seq(10000)
var unique = seqer.gensym()
```

seqer 包含的方法都没有用到 this 或 that ，因此没有办法损害 seqer 。除非调用对应的方法，否则没有办法改变 prefix 或 seq 的值。 seq 对象是可变的，所以它的方法可能会被替换掉，但替换后的方法依然不能访问私有成员。 seqer  就是一组函数的集合，而且那些函数被授予特权，拥有使用或修改私有状态的能力。

如果我们把 seqer.gensym 作为一个值传递给第三方函数，那个函数能用它产生唯一字符串，但却不能通过它来改变 prefix 或 seq 的值。

### 级联

有一些方法没有返回值。例如，一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。如果我们让这些方法返回 this 而不是 undefined 就可以启用级联。在一个级联中，我们可以在单独一条的语句中依次调用同一个对象的很多方法。一个启用级联的 Ajax 类库可能允许我们以这样的形式去编码。

```js
getElement('myBoxDiv').
    move(350, 150).
    with(300).
    height(100).
    color(4000)
```

### 套用

函数也是值，从而我们可以用有趣的方式去操作函数值。套用允许我们将函数与传递给它的参数相结合去产生出一个新的函数。

```js
var add1 = add.curry(1)
document.writeln(add1(6))
```

add1 把 1 传递给 add 函数的 curry 方法后创建一个函数。add1 函数把传递给它的参数的值加 1。JavaScript 并没有 curry 方法，但我们可以通过给 Function.prototype 添加功能来实现。

