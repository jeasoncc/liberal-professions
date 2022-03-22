# JavaScript 继承全解析（建议收藏）

在大多数的编程语言中，继承都是一个重要的主题。

在那些基于类的编程语言中，继承提供了两个有用的服务。首先，它是代码重用的一种形式。如果一个新的类和一个已经存在的类大部分相似，那么你只须说明其不同点即可。

<u>代码重用的模式极为重要，因为它们很有可能显著地减少软件开发的成本。类继承的另一个好处是它包括了一套类型系统的规范。由于程序员无需显式类型转换的代码，他们的工作量将大大的减轻</u>，这是一件很好的事情，因为**类型转换时会丢失类型系统在安全上的好处。**

JavaScript 是一门弱类型语言，从不需要类型转换。对象的起源是无关紧要的，**对于一个对象来说重要的是它能做什么，而不是它从哪里来。**

JavaScript 提供了一套更为丰富的代码重用模式，它可以模拟那些基于类的模式，同时它也可以支持其他更具表现力的模式。在 JavaScript 可能的继承模式有很多。

在基于类的语言中，对象是类的实例，并且类可以从另一个类继承而来。**JavaScript 是一门基于原型的语言，这意味着对象直接从其他对象继承。**

> 原型可以直接从对象继承。

## 伪类

JavaScript 的原型存在着诸多的矛盾。某些看起来有点像基于类的语言的复杂语法问题遮蔽了它的原型机制。它不让对象直接从其他对象继承，反而插入了一个多余的间接层，从而使构造器函数产生对象。

当一个函数对象被创建时， Function 构造器产生的函数对象会运行类似这样一个代码：

```js
this.prototype = {
	concstructor: this
}
```

新函数对象被赋予一个 prototype 属性，其值是包含一个 constructor 属性且属性值为该函数对象。该 prototype 对象是存放继承特征的地方。因为 JavaScript 语言没有提供一种方法去确定哪个函数是打算来做构造器的，所以每个函数都会得到一个 prototype 对象。 constructor 属性没什么用。重要的是 prototype 对象。

当采用构造器调用模式，即使用 new 前缀去调用一个函数时，这将修改函数执行的方式。

如果 new 运算符是一个方法，而不是一个运算符，它可能会像这样执行。

```js
if(typeof Object.beget !== 'function') {
    Object.beget = function(o) {
        var F = function() {}
        F.prototype = o
        return new F()
    }
}

Function.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func
        return this
    }
}

Function.method('new', function () {
    // 创建一个新对象，它继承自构造器函数的原型对象.
    var that = Object.beget(this.prototype)
    // 调用构造器函数，绑定 this 到新新对象。
    var other = this.apply(that, arguments)
    // 如果它的返回值不是一个对象，就返回该对象。
    return (typeof other === 'object' && other) || that
})
```

---

我们可以定义一个构造器并扩充它的原型

```js
var Mammal = function(name) {
    this.name = name
}
Mammal.prototype.get_name = function () {
    return this.name
}
Mammal.prototype.says = function () {
    return this.saying || ''
}
```

现在，我们可以构造一个实例

```js
var myMammal = new Mammal('jeason')
var name = myMammal.get_name()
```

我们可以构造另一个伪类来继承 Mammal，这是通过定义它的 constructor 函数并替换它的 prototype 为一个 Mammal 的实例来实现的。

```js
var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
}

// 替换 Cat.prototype 为一个新的 Mammal 实例
Cat.prototype = new Mammal()

Cat.prototype.purr = function(n) {
    return 'purr'
}
Cat.prototype.get_name = function() {
    return this.says() +  ' ' + this.name + ' ' + this.says()
}
var myCat = new Cat('foobar')
console.log(myCat.says())
console.log(myCat.purr(5))
console.log(myCat.get_name())
console.log(myCat)
```

伪类模式本意是想向面向对象靠拢，但它看起来格格不入。我们可以隐藏一些丑陋的细节，这是通过使用 method 方法定义一个 inherits 方法来实现的

```js
Function.method('inherits', function (Parent) {
    this.prototype = new Parent()
    return this
})
```

我们的 inherits 和 method 方法都返回 this，这将允许我们可以以级联的样式编程。

```js
var BigCat = function(name) {
    this.name = name;
    this.saying = 'meow';
}
BigCat.inherits(Mammal).
    method('purr', function (n) {
        return 'purr'
    }).
    method('get_name', function () {
        return this.says() +  ' ' + this.name + ' ' + this.says()
    });


console.log(BigCat)
var myCat1 = new BigCat('foobar')
console.log(myCat1.says())
console.log(myCat1.purr(5))
console.log(myCat1.get_name())
console.log(myCat1)
```

通过隐藏那些「无谓的」 prototype 操作细节，现在它看起来没那么怪异了。但我们是否真的有所改善呢？我们现在有了行为像「类」的构造器函数，但仔细去看，它们可能有着令人惊讶的行为：没有私有环境，所有属性都是公开的。无法访问父类的方法。

**更糟糕的是，使用构造器函数存在一个严重的危害。如果你在调用构造器函数时忘记在前面加上 new 前缀，那么 this 将不会被绑定到一个新对象上。可悲的是， this 将被绑定到全局对象上，所以你不但没有扩充新对象，反而破坏了全局变量。**这真的是糟糕透顶，发生了那样的情况时，既没有编译时警告，也没有运行时警告。

这是一个严重的语言设计错误。为了降低这个问题带来的风险，所有的构造器函数都约定命名成首字母大写的形式，并且不以首字母大写的形式拼写任何其他的东西。这样我们至少可以通过眼睛检查是否缺少了 new 前缀。一个更好的备选方案就是根本不使用 new。

**「伪类」可以给不熟悉 JavaScript 的程序员提供便利，但它也隐藏了该语言的真实本质。借鉴类的表示法可能误导程序员编写过于深入与复杂的层次结构。许多复杂的类层次结构产生的原因就是静态类型检查的约束。JavaScript 完全摆脱了那些约束，在基于类的语言中，类的继承是代码重用的唯一方式，JavaScript 有着更多且更好的选择。**

## 对象说明符

有时候，构造器要接受一大串参数，这可能是令人烦恼的，因为要记住参数的顺序可能非常困难。在这种情况下，如果我们编写构造器时介绍一个简单的对象说明符可能更加友好。那个对象包含了将要构建的对象规格说明，所以，与其这么写：

```js
var obj1 = marker(arg1, arg2, args3)
```

不如这么写：

```js
var obje2 = marker({
    first: arg1,
    setcond: arg2,
    third: arg3
})
```

现在多个参数可以按照任意顺序排列，如果构造器聪明地使用默认值，一些参数可以忽略掉，并且代码也更容易阅读。

当与 JSON 一起工作时，这还可以有一个间接的好处。 JSON 文本只能描述数据，但有时数据表示的一个对象，将该数据与它的方法关联起来是有用的。如果构造器取得一个对象说明符，可以容易做到，因为我们可以简单传递该 JSON 对象构造器，而它将返回一个构造完全的对象。

## 原型

在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承相比基于类的继承的概念上更为简单：一个新对象可以继承一个旧对象的属性。也许你对此感到陌生，但它真的很容易理解。你通过构造一个有用的对象开始，接着可以构造更多和那个对象类似的对象。可以完全避免把一个应用拆解成一系列嵌套抽象类的分类过程。

让我们先用对象字面量去构造一个有用的对象。

```js
var myMammal = {
    name: 'foobar',
    get_name: function() {
        return this.name
    },
    says: function () {
        return this.saying || ''
    }
}
```

一旦有了一个对象，我们就可以利用 Object.beget 方法构造出更多的实例出来，接下来我们要定制新的实例：

```js
var myMammal = {
    name: 'foobar',
    get_name: function() {
        return this.name
    },
    says: function () {
        return this.saying || ''
    }
}

var myCat2 = Object.beget(myMammal)
myCat2.name = 'foo bar Jeason'
mycat2.saying = 'meow'
mycat2.purr = function() {
    return 'purr'
}
mycat2.get_name = function () {
    return this.syas + ' ' + this.name + ' ' + this.says
}
```

这是一种「差异化继承」，通过定制一个新的对象，我们指明了它与所基于的基本对象的区别。

有时候，它对某种数据结构从其他数据结构继承的情形非常有用。这里就有一个例子：假定我们要解析一门类似 JavaScript 那样一对用花括号指示作用域的语言。定义在一个作用域中的条目在该作用域之外是不可见的。从某种意义来理解，也就是说一个内部作用域会继承它的外部作用域。JavaScript 在表示这样的关系上做得非常好。当遇到一个花括号时 block 函数将从 scope 中寻找符号，并且当它定义了新的符号时扩充 scope：

```js
var block = function () {
    // 记住当前的作用域，构造了一个包含了当前作用域中所有的对象的新作用域
    var oldScope = scope;
    scope = Object.beget(scope)
    // 传递花括号作为参数调用 advance 
    advance("{")
    // 使用新的作用域进行解析
    parse(scope)
    // 传递右花括号作为参数调用 advance 并抛弃新作用域，恢复原来老的作用域
    advance("}")
    scope = oldScope
}
```

## 函数化

迄今为止，所看到的继承模式的一个弱点就是我们没法保护隐私。对象的所有属性都是可见的。我们没法得到私有变量和私有函数。有时候那不要紧，但有时候却是大麻烦。遇到这些麻烦的时候，一些不知情的程序员接受了一种伪装私有的模式。如果想构造一个私有的属性，他们就给其起一个怪模怪样的名字，并且希望其他使用代码的用户假装看不到这些奇怪的成员元素。幸运的是，我们有一个更好的选择，那就是模块模式的应用。

我们从构造一个将产生对象的函数开始，给它起的名字将以一个小写字母开头，因为它并不需要使用 new 前缀。该函数包括四个步骤。

1. 它创建了一个新对象。有很多的方式去构造一个对象。它可以构造一个对象字面量，或者它可以和 new 前缀连用去调用一个构造器函数，或者它可以使用 Object.beget 方法去构造一个已经存在的新对象的实例，或者它可以调用任意一个会返回一个对象的函数。
2. 它选择性地定义私有实例变量和方法。这些就是函数中通过 var 语句定义的普通变量。
3. 它给这个新对象扩充方法。那些方法将拥有特权去访问参数，以及在第二步中通过 var 语句定义的变量。
4. 它返回那个新对象。

这里是一个函数构造器的伪代码版本

```js
var constructor = function(spec, my) {
    var foo, bar
    my = my || {}
    // 把共享的变量和函数添加到 my 中
    that = new object
    // 添加给 that 的特权方法
    that.test = function() {}
    return that
}
```

spec 对象包含构造器需要构造一个新实例的所有信息。 spec 的内容可能会被复制到私有变量中，或者被其他函数改变。或者方法可以在需要的时候访问 spec 的信息。

my 对象是一个继承中的构造器提供秘密共享的容器。 my 对象可以选择性地使用，如果没有传入一个 my 对象，那么会创建一个 my 对象。

接下来，声明该对象私有的实例变量和方法。通过简单的声明变量就可以做到。构造器变量和内部函数变成了该实例的私有成员。内部函数可以访问 spec、my、that，以及其他私有变量。

接下来，给 my 对象添加共享的秘密成员。这是通过赋值语句来做的：

```js
my.member = value
```

现在，我们构造了一个新对象并将其赋值给 that。有很多方式可以构造一个新对象，我们可以使用对象字面量，可以用 new 运算符调用一个伪类构造器，传给它一个 spec 对象和 my 对象。my 对象允许其他的构造器分享我们放到 my 中的资料。其他的构造器可能也会将自己的可分享的秘密成员放进 my 对象中，以便我们的构造器可以使用它。

接下来，我们扩充 that，加入组成该对象接口的特权方法，我们可以分配一个新函数成为 that 的成员方法，或者，更安全的，我们可以先将函数定义为私有方法，然后再将它们分配给 that：

```js
var methdical = function () {}
that.methdiccal = methdical
```

分两步去定义 methdical 的好处是，如果其他方法想要调用 methdical，它们可以直接调用 methdical()，而不是 that.methdical()。如果该实例被破坏或篡改，甚至 that.methdical 被替换掉了，调用 methdical 的方法将同样会继续工作，因为它们私有的 methdical 不受该实例的影响。

最后，我们返回 that

让我们这个模式应用到 mammal 例子里，此处不需要 my，所以我们先抛开它，但将使用一个 spec 对象。

name 和 saying 属性现在是完全私有的，它们只有通过 get_name 和 says 两个特权方法才可以访问。

```js
var mammal = function(spec) {
    var that = {}
    that.get_name = function() {
        return spec.name
    }
    that.says = function() {
        return spec.saying || ''
    }
    return that
}
var myMammal = mammal({
    name: 'foo bar'
})
```

在伪类模式中，构造器函数 Cat 不得不重复构造器 Mammal 已经完成的工作。在函数化模式中那不再需要了，因为构造器 Cat 将会调用构造器 Mammal，让 Mammal 去做对象创建中的大部分工作，所以 Cat 只需要关注自身的差异即可。

```js
var cat = function(spec) {
    spec.saying = spec.saying || 'meow'
    var that = mammal(spec)
    that.purr = function () {
        return 'purr'
    }
    that.get_name = function() {
        return that.says() + ' ' + spec.name + ' '  + that.says()
    }
    return that
}

var myCat = cat({name: 'jeaosn'})
console.log(myCat)
```

函数化模式还给我们提供了一个处理父类方法的方法，我们将构造一个 superior 方法，它取得一个方法名并返回调用那个方法的函数。该函数将调用原来的那个方法，尽管属性已经变化了。

```js
Object.method('superior', function(name) {
    var that = this
    var method = that[name]
    return function() {
        return method.apply(that,arguments)
    }
})
```

让我们在 coolcat 上试验一下， coolcat 就像是 cat 一样，除了它有一个更酷的调用父类方法的 get_name 方法。它只需要一点点准备工作，我们将声明一个 super_get_name 变量，并且把调用 superior 方法所返回的结果赋值给它。

```js
var coolcat = function(spec) {
    var that = cat(spec)
    var super_get_name = that.superior('get_name');
    that.get_name = function() {
        return 'like' + ' ' + super_get_name() + 'baby'
    }
    return that
}

var myCoolCat = coolcat({name: 'josh'})
var name= myCoolCat.get_name()
console.log(name)
console.log(myCoolCat)
```

<u>函数化模式有很大的灵活性，它不仅不像伪类模式那样需要很多功夫，还让我们得到更好的封装和信息隐藏，以及访问父类方法的能力。</u>

**如果对象的所有状态都是私有的，那么该对象就成为一个「防伪」对象。该对象的属性可以被替换或删除，但该对象的完整性不会受到损害。如果我们用函数化的样式创建一个对象，并且该对象的所有方法都不使用 this 或 that，那么该对象就是持久性的。一个持久性对象就是一个简单功能函数的集合。**

一个持久性对象不会被损害，访问一个持久性对象时，除非被方法授权，否则攻击者不能访问对象的内部状态。

## 部件

我们可以从一套部件中组合出对象来。例如，我们可以构造一个添加简单事件处理特性到任何对象上的函数。它会给对象添加一个 on 方法，一个 fire 方法和一个私有的事件注册对象。

```js
var eventuality = function(that) {
    var registry = {}
    that.fire = function () {
        // 在一个对象是触发一个事件，该事件可以是一个包含事件名称的字符串
        // 或是拥有一个包含事件名称 type 属性的对象
        // 通过 ‘on' 方法注册的事件处理程序中匹配事件名称的函数将被调用
        var array
        var func
        var handle
        var i
        var type = typeof event === 'string' ? event : event.type
        // 如果这个事件存在一组事件处理程序，那么就遍历它们并顺序依次执行
        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for(i = 0; i< array.lenth;i += 1) {
                handle = array[i]
            }
            // 每组处理程序包含一个方法和一个可选的参数
            // 如果该方法是一个字符串形式的名字，那么寻找到该函数
            func =handle.method
            if (typeof func === 'string') {
                func =this[func]
            }
            // 调用一个处理程序，如果该条目包含参数，那么传递它们进去。否则，传递该事件对象
            func.apply(this, handle.parameters || [event]);
        }
        return this
    }
    that.on = function(type, method, parameters) {
        // 注册一个事件，构造一条处理程序条目，将它插入到处理程序数组中
        // 如果这种类型还不存在，那就构造一个
        var handler = {
            method: method,
            parameters: parameters
        }
        if(registry.hasOwnProperty(type)) {
            registry[type].push(handler)
        } else {
            registry[type] = [handler]
        }
        return this
    }
    return that
}

```

我们可以在任何单独的对象上调用 eventuality，授予它事件处理方法。我们也可以赶在 that 被返回之前在一个构造器函数中调用它。

```js
eventuality(that)
```

用这种方式，一个构造器函数可以从一套部件中组装出对象。JavaScript 的弱类型在此处是一个巨大的优势，因为我们无需花费精力去关注一个类型系统的类族谱。相反，我们专注它的个性内容。

