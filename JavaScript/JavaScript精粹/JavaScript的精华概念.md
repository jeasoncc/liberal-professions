#  JavaScript的基本精华概念

## 对象

JavaScript 的简单类型包<u>括数字、字符串、布尔值、null 和 undefined</u> 值。

> 总共 5 种基本类型

其他的所有值都是对象，数字、字符串和布尔值「貌似」对象，因为它们拥有方法，但它们是不可变的。JavaScript 中的对象是可变键控集合。在 JavaScript 中，数组是对象，函数是对象，正则表达式是对象，当然，对象自然也是对象。

> 5 种基本类型里，除了 null 和 undefined 是没有方法的，其他 3 个都有方法，看起来像是对象一样

**对象是属性的容器**，其中每个属性都拥有名字和值。属性的名字可以是包括空白字符在内的任意字符串，属性值可以是除 undefined 值之外的任何值。

> 对象是用来装载数据的，数据是以属性，即键值对的方式存在的。现在属性值也可以是 undefined

JavaScript 中的对象是无类别的，它对新属性的名字和值没有约束。对象适合用于收集和管理数据。对象可以包含其它对象，所以它们很容易地表示成树形结构。

**JavaScript 有一个原型链特性，允许对象继承另一对象的属性。正确地使用它能减少对象的初始化时间和内存消耗。**

> 在我以往的项目经验里，其实对原型链的使用是很少的。看样子对原型链的使用，似乎可以在性能上更加高效。

## 对象字面量

对象字面量提供了一种非常方便地创建新对象值的表示法，一个对象字面量就是包围在一对花括号的零或多个 「名/值」对。对象字面量可以出现在任何允许表达式出现的地方。

```js
var empty_object = {}
var storage = {
    "first-name": 'jeason',
    "last-name": 'chen'
}
```

属性名可以是包括空字符串在内的任何字符串。在对象字面量中，如果属性名是一个合法的 JavaScript 标识符并且不是保留字，并不强制要求用引号括住属性名。逗号用来分隔多个属性。

> 对象是一种类型结构，对象字面量是创建新对象的方法。

属性的值可以从包括另一个对象字面量以内的任意表达式中获得，对象是可嵌套的。

```js
var flight = {
    airline: 'ocean',
    number: 12,
    arrival: {
        time: '2022-2-21'
    }
}
```

## 检索

要检索对象中包含的值，可以采用在 [] 后缀中包括一个字符串表达式的方式。如果字符串表达式是一个常数，而且它是一个合法的 JavaScript 标识符而并非保留字，那么也可以用 . 代替。优先使用 . 表示法，因为它更紧凑且可读性更好。

```js
storage['first-name'] // 'jeason'
flight.airline // 'ocean'
```

如果你尝试检索一个并不存在的成员元素的值，将返回一个 undefined 

|| 运算符可以用来填充默认值

```js
var middle = storage['middle-name'] || 'none'
var status = storage['middle-name'] || 'unknow'
```

如果尝试检索一个 undefined 值将会导致 TypeError 异常，这可以通过 && 逻辑与运算符来避免错误。

<u>逻辑与是一种短路操作，如果左侧表达式为 false，则直接短路返回结果，不再运算右侧表达式。</u>

## 更新

对象中的值可以通过赋值语句来更新，如果属性名已经存在于对象中，那么这个属性的值就会被替换

如果对象之前没有拥有那个属性名，那么该属性就会扩充到该对象当中去。

## 引用

对象通过引用来传递，它们永远不会被拷贝。

```js
var x = storage
x.nickname = 'josh'
var nick = storage.nickname
// 因为 x 和 storage 是指向同一个对象的引用，所以 nick 为 'josh'

var a = {},b={},c ={}
// a b c 每个都引用一个不同的对象
var e = f = g = {}
// a b c 都引用同一个空对象
```

## 原型

每个对象都连接到一个原型对象上，并且它可以从中继承属性。所有通过对象字面量创建的对象，都连接到 Object.prototype 这个 JavaScript 中标准的对象。

当你创建一个新对象时，你可以选择某个对象作为它的原型。JavaScript 提供的实现机制杂乱而复杂，但其实它可以明显的被简化。我们将给 Object 增加一个 beget 方法。这个beget 方法创建一个使用原对象作为其原型的新对象。

```js
var abc = {
    a: 'jeason',
    b: 'josh'
}
abc.fff = 'jeddsdsds'
var another_abc = Object.beget(abc)

console.log(another_abc)
console.log(another_abc.a)
```

 原型对象在更新时是不起作用的，当我们对某个对象作出改变时，不对触及到该对象的原型。

```js
another_abc.a = "daddsds"
console.log(another_abc)
```

### 委托

原型对象只有在检索值的时候才会被用到。如果我们尝试去获取对象的某个属性值，且该对象没有此属性名，那么 JavaScript 会试着从原型对象中获取属性值。如果那个原型对象也没有该属性，那么再从它的原型中寻找，以此类推，直到最后到达终点 Object.prototype。如果想要的属性完全不存在原型链中，那么结果就是 undefined 值。这个过程称为委托。

**原型关系是一种动态的关系，如果我们添加一个新的属性到原型链当中，该属性会立即对所有基于该原型创建的对象可见。**

## 反射

检查对象并确定对象有什么属性是件很容易的事情，只要试着去检索该属性并验证取得的值。typeof 操作符对确定属性的类型很有帮助。

```js
typeof flight.number //number
typeof flight.airline //string
typeof flight.arrival //object
typeof fligth.test // 'undefined'
```

请务必注意该圆形链上的任何属性也会产生一个值

```js
typeof flight.toString // 'function'
typeof flight.constructor // 'function'
```

有两个方法处理这些不需要的属性，第一个是让你的程序检查并剔除函数值。一般来说，**做反射的目标是数据，因此你应该意识到一些值可能会是函数。**

另一个方法是使用 hasOwnProperty 方法，**如果对象拥有独有的属性，它将返回 true** 。<u>hasOwnProperty 方法不会检查原型链。</u>

## 枚举

for in 语句可用来遍历一个对象中的所有属性名。该枚举过程将会列出所有的属性，包括函数和你可能不关心的原型中的属性，所以有必要过滤掉那些你不想要的值。**最为常见的过滤器是 hasOwnProperty 方法，以及使用 typeof 来排除函数**

```js
for (const name in another_abc) {
    if (Object.hasOwnProperty.call(another_abc, name)) {
        const element = another_abc[name];
        console.log(element)       
    }
}
```

属性名出现的顺序是不确定的，因此要对任何可能出现的顺序有所顺序。如果你想要确保属性以特定的顺序出现，最好的办法就是完全避免使用 for in 语句，而是创建一个数组，在其中以正确的顺序包含属性名。

```js
var storage = {
    'first-name': 'jeason',
    'middle-name': 'test',
    'last-name': 'test2',
    'profession': '212121'
}
var i;
var prototypies = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
]
for (let i = 0; i < prototypies.length; i++) {
    const element = prototypies[i];
    document.writeln(element+ ":" + storage[element])
    
}
```

通过使用 for 而不是 for in ,可以得到我们想要的属性，而不用担心发掘出原型链中的属性，并且我们安正确的顺序取得了它们的值。

## 删除

delete 运算符可以用来删除对象的属性，它将会移除对象中确定包含的属性。它不会触及原型链中的任何对象。

删除对象的属性可能会让来自原型中的属性浮现出来。

## 减少全局变量污染

JavaScript 可以很随意地定义那些可保存所有应用资源的全局变量，不幸的是，全局变量削弱了程序的灵活性，所以应该避免。

最小化使用全局变量的一个方法是在你的应用中只创建唯一一个全局变量。

```js
var MYAPP = {}
```

该变量此时变成了你的应用的容器。

```js

MYAPP.storage = {
    'first-name': 'jeason',
    'last-name': 'chen'
}
MYAPP.flight = {
    airline: 'Oceans',
    number: 43,
    departure: {
        IARA: 'SYD',
        time: '2021-02-21',
        city: "shanghai"
    }
}
```

只要把多个全局变量都整理在一个名称空间下，你将显著降低与其他应用程序、组件或类库之间产生糟糕的相互影响的可能性。你的程序也会变得更容易阅读，因为很明显 MYAPP.storage 指向的顶层结构。

也可以使用闭包来进行信息隐蔽的方式，它是另一个有效减少全局污染的方法。	

