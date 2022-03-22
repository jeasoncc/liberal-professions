# JavaScript 数组

**数组是一段线性分配的内存，它通过整数去计算偏移并访问其中的元素。**

数组可以是很快的数据结构，不幸的是，JavaScript 没有像这种数组一样的数据结构。

反而**，JavaScript 提供了一种拥有类数组特性的对象，它把数组的下标转为字符串，用其作为属性。**它明显地比一个真正的数组要慢，但它可以更方便的使用。属性的检索和更新的方式与对象一模一样，除了有一个可以用整数作为属性名的特性外，数组有它们自己的字面量格式。

而且，数组也有一套非常有用的内置方法。

## 数组字面量

数组字面量提供了一种非常方便地创建新数组的表示法，一个数组字面量是在一对方括号中包围零个或多个用逗号分隔的值的表达式。数组字面量可以在任何表达式出现的地方出现。

数组的第一个值将获得属性名「0」，第二个表达式将获得属性名「1」，以此类推。

```js
var numbers = [
    'zero','one','two','three','four'
]

var number_object = {
    '0':'zero',
    '1':'one',
    '2':'two',
    '3':'three'
}
```

产生了一个相似的结果，numbers 和 number_object 都是包含有 10 个属性的对象，并且那些属性刚好有相同的名字和值。但是它们也有一些显著的不同，**number 继承自 Arrary.property，而 number_object 继承自 Object.property，所以 numbers 继承了大量有用的方法**。同时，numbers 也有一个诡异的 length 属性，而 number_object 则没有。

在大多数语言中，一个数组的所有元素都要求是相同的类型，JavaScript 允许数组包含人类混合类型的值。

## 长度

每个数组都有一个 length 属性，和大多数其他的语言不同，JavaScript 数组的 length 是没有上界的。如果你用大于或等于当前的 lenght 的数字作为下标来保存一个元素，那么 length 将增大来容纳新元素，不会发生数组边界错误。

**length 属性的值是这个数组的最大整数属性名加上 1，它不一定等于数组里面的属性的个数。**

```js
var myArray = []
myArray.length  // 0

myArray[100000] = true
myArray.length // 100001
// myArray 只包含一个属性
```

[ ] 后缀下标运算符将它的表达式转换成一个字符串，如果该表达式有 toString 方法，就使用该方式的值。这个字符串被用作属性名，如果这个字符串看起来像一个大于或等于这个数组当前的 length 且小于 4294 967 295 的正整数，那么这个数组的 length 就会被重新设置为新的下标加 1

**你可以直接设置 length 的值，设置更大的 length 无须给数组分配更多的空间。而把 length 设小将导致所有的下标大于等于新 length 的属性被删除。**

```js
numbers.length = 3
// number 是 ['zero', 'one', 'two']
```

通过把下标指定为数组的当前 length，可以附加一个新元素到该数组的尾部。

```js
numbers[numbers.length] = 'jeason'
// number 是 ['zero', 'one', 'two','jeason']
```

有时用 push 方法可以更方便地完成同样的事情。

```js
numbers.push('foo')
// number 是 ['zero', 'one', 'two','jeason','foo']
```

## 删除

由于 JavaScript 的数组其实就是对象，所以 delete 运算符可以用来从数组中移除元素

```js
delete numbers[2]
// number 是 ['zero', 'one', undefined,'jeason','foo']
```

不幸的是，那样会在数组中遗留一个空洞，这是因为排在被删除元素之后的元素保留了它们最初的名字（下标）。而你通常想要的是递减后每个元素的名字（下标）

幸运的是，JavaScript 数组有一个 splice 方法，它可以对数组做个手术，删除一些元素并将它们他替换为其他的元素。第一个参数是数组中的第一个序号。第二个参数是要删除的元素个数。任何额外的参数会在序号那个点的位置被插入到数组中：

```js
numbers.splice(2,1)
// numbers 是 ['zero', 'one', 'jeason', 'go']
```

被删除属性后的每个属性必须被移除，并且以一个新的键值重新插入。这对于大型数组来说可能效率不会高。

## 枚举

因为 JavaScript 的数组类型其实就是对象，所以 for in 语句可以用来遍历一个数组的所有属性。不幸的是，**for in 无法保证属性的顺序**，而大多数的数组应用都期望按照阿拉伯数字顺序来产生数组。

此外，可能从原型链中得到意外属性的问题依然存在。

幸运的是，常规的 for 语句避免了这些问题。 JavaScript 的 for 语句和大多数类 C 语句相似，它由三个从句控制：第一个初始化循环，第二个执行条件检测，第三个执行增量运算。

```js
var i
for(i = 0;i < myArray.length;i += 1){
    //  操作
}
```

## 混淆的地方

在 JavaScript 编程中，一个常见的错误是在需要使用数组时使用了对象，或者在需要使用对象时使用了数组。其实规则很简单：**当属性名是小而连续的整数时，你应该使用数组，否则，使用对象。**

**JavaScript 本身对于数组和对象的区别是混乱的，typeof  运算符报告数组类型是 'object'，这没有什么意义。**

JavaScript 在区别数组和对象上没有一个好的机制，可以通过定义我们自己的 is_array 函数来避开这个缺陷：

```js
var is_array = function(value) {
    return value && typeof value === 'object'  && value.constructor === Array
}
```

## 方法

JavaScript 提供了一套作用于数组的方法，这些方法是被储存在 Arrary.prototype 中的函数。Arrary.prototype 也可以被扩充。

```js
// 每一个 JavaScript 函数实际上都是一个 Function对象
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func
        return this
    }
}

Array.method('reduce', function(f, value) {
    var i
    for(i = 0;i<this.length;i += 1){
        value = f(this[i],value)
    }
    return value
})
```

`通过给 Arrary.prototype 扩充一个函数，每个数组都继承了这个方法。

在上面的例子中，我们定义了一个 reduce 方法，它接受了一个函数和一个初始值作为参数。它遍历这个数组，以当前和该初始值为参数调用这个函数，并且计算出一个新值。当完成时，它返回这个值。如果我们传入一个将两个数字相加的函数，它会计算相加的和；如果我们传入两个数字相乘的函数，它会计算其乘积。

```js
// 每一个 JavaScript 函数实际上都是一个 Function对象
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func
        return this
    }
}

Array.method('reduce_', function(f, value) {
    var i
    for(i = 0;i<this.length;i += 1){
        value = f(this[i],value)
    }
    return value
})

var data = [
    1,
    2,
    3,
    4,
    5,
    6,
    2
]

var add = function(a, b) {
    return a + b
}

var mult = function(a,b) {
    return a * b
}

var sum = data.reduce_(add, 0)
console.log(sum) // 23

var multNum = data.reduce_(mult,1)
console.log(multNum) // 1440
```

## 维度

JavaScript 的数组通常不会初始化，如果你用 [ ] 得到一个新数组，它将是空的。如果你试图访问一个不存在的元素，将得到的是 undefined，如果你了解这个问题，或者你在尝试获取每个元素之前都有预见性的设置了它，那么万事大吉了。但是，如果你实现的算法是假设每个元素都从已知的值开始，那么你必须准备好这个数组。JavaScript 应该提供一些类似 Arrary.dim 这样的方法来做这个事，但我们可以很容易纠正这个疏忽。

```js
Array.dim = function(dimension, inital) {
    var a = [],i
    for(i = 0; i<dimension; i += 1) {
        a[i] = inital
    }
    return a 
}

// 创建一个包含 10 个 0 的数组
var my_array = Array.dim(10, 0)
console.log(my_array)
```

