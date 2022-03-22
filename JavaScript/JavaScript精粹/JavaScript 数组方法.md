# JavaScript 数组方法

## array.concat(item……)

concat 方法返回一个新数组，它包含 array 的浅复制，并将一个或多个参数 item 附加在其背后。如果参数 item 是一个数组，那么它的每个元素会被分别添加。

```js
var a = ['a', 'b', 'c']
var b = ['x', 'y', 'z']
var c = a.concat(b)
console.log(c) // Array(6) [ "a", "b", "c", "x", "y", "z" ]
```

## array.join(separator)

join 方法把一个 array 构造成一个字符串，并用一个 separator 为分隔符把它们连在一起。默认的 separator 是 ',' 。为了实现无间隔的连接，我们可以用空字符串作为 separator。

如果你想把一个大量的片段组装成一个字符串，把这些片段放到一个数组中，并用 join 方法连接起来，它通常比用 + 元素运算符连接这些片段要快。

```js
var a = ['a', 'b', 'c']
a.push('d')
var c = a.join('')
console.log(c) // abcd
```

## array.pop()

pop 和 push 方法使数组 array 像堆栈一样工作。**pop 方法移除 array 中的最后一个元素并返回该元素**，如果该 array 是空的，它会返回 undefined

```js
var a = ['a', 'b', 'c']
var c = a.pop()
console.log(a) // Array [ "a", "b" ]
console.log(c) // c
```

pop 可以像这样实现：

```js
// 每一个 JavaScript 函数实际上都是一个 Function对象
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func
        return this
    }
}
Array.method('pop_', function() {
    return this.splice(this.length - 1, 1)[0]
})
```

## array.push(item...)

**push 方法将一个或多个参数 item 附加到一个数组的尾部，不像 concat 方法那样，它会修改该数组 array，如果参数 item 是一个数组，它会将参数作为单个元素整个添加到数组中，它返回这个数组 array 的新长度值。**

> 注：
>
> - 会修改该数组 array
> - 如果参数 item 是一个数组，它会将参数作为单个元素整个添加到数组中
> - 它返回这个数组 array 的新长度值

push 可以这样实现：

```js
var a = ['a', 'b', 'c']
var b = ['x', 'y', 'z']

Array.method('push_', function () {
    this.splice.apply(
        this,
        [this.length, 0].concat(
            Array.prototype.slice.apply(arguments)
        )

    )
    return this.length
})
var c = a.push_(b, true)
console.log(a) // Array(5) [ "a", "b", "c", (3) […], true ]
console.log(b) // Array(3) [ "x", "y", "z" ]
console.log(c) // 5
```

## array.reverse()

```js
var foo = ['josh', 'chrise']
var bar = foo.reverse()
console.log(bar) // Array [ "chrise", "josh" ]
```

## array.shift()

shift 方法移除数组 array 中的第一个元素并返回该元素，如果这个数组是空的，那么它会返回 undefined，**shift 通常比 pop 慢得多。**

```js
var foo = ['josh', 'chrise']
var foobar = foo.shift()
console.log(foo) // Array [ "josh" ]
console.log(foobar) // chrise
```

shift 可以这样实现：

```js
Array.method('shift_', function() {
    return this.splice(0, 1)[0]
})
```

## arry.unshift(item...)

array.unshift 方法像 push 方法一样用于将元素添加到数组中，但它是把 item 插入到 array 的开始部分，而不是尾部。它返回 array 新的长度

```js
var a = ['a', 'b', 'c']
var r = a.unshift('foo', 'bar')
// a = ['foo', 'bar', 'a', 'b', 'c']
// r = 5
```

unshift 可以这样实现：

```js
Array.method('unshift', function() {
    this.splice.apply(this,
    	[0,0].concat(
        	Array.prototype.slice.apply(arguments)
    	)               
    )
})
```



## array.slice(start, end)

slice 方法对 array 中的一段做浅复制，第一个被复制的元素是 array[start]。它将一直复制到 array[end] 为止。end 参数是可选的，并且默认是该数组的长度 array.length。

如果两个参数中的任何一个是负数，array.length 将和它们相加来试图使它们成为非负数。如果 start 大于等于 array.length，得到的结果将是一个新的空数组。

```js
var a = ['a', 'b', 'c']
var b = a.slice(0)
var c = a.slice(0,1)
var d = a.slice(1,2)
var e = a.slice(-2)

console.log(a) // Array(3) [ "a", "b", "c" ]
console.log(b) // Array(3) [ "a", "b", "c" ]
console.log(c) // Array [ "a" ]
console.log(d) // Array [ "b" ]
console.log(e) // Array [ "b", "c" ]
```

## array.sort(compareFn)

sort 方法对 array 中的内容进行适当的排序，它不能正确地给一组数字排序:

```js
var n = [4, 8, 15, 16, 23, 43]
n.sort() // n 是 [15, 16, 23, 4, 42, 8]
```

JavaScript 的默认比较函数假定所有要被排序的元素都是字符串，它尚未足够智能到在比较这些元素之前先检测它们的类型，所以当它比较这些数字的时候，会将它们转化为字符串，导致一个令人吃惊的错误。

幸运的是，你可以使用自己的比较函数替代默认的比较函数。你的比较函数应该接受两个参数，并且**如果这两个参数相等则返回 0，如果第一个参数应该排在前面，则返回一个负数，如果第二个参数应该排在前面，则返回一个正数。**

```js
n.sort(function(a, b) {
    return a - b
})
// n 是	[4,8,15,16,23,43]
```

上面这个函数将给数字排序，但它不能给字符串排序。如果我们想要给任何简单值数组排序，则必须做更多的工作。

```js
var m = ['aa', 'a', 'bb',4, 8, 15, 16,15,  23, 43]

m.sort(function(a,b){
    if(typeof a  === typeof b) {
        return a - b
    }
    return typeof a < typeof b ? -1 : 1
})

console.log(m)
// Array(10) [ 4, 8, 15, 15, 16, 23, 43, "aa", "a", "bb" ]
```

如果有一个更智能的比较函数，我们也可以给对象数组排序。为了在一般情况下让这个事情更容易，我们将编写一个构造比较函数的函数。

```js
var by  = function(name) {
    return function(o,p) {
        var a, b
        if(typeof o === 'object' && typeof p === 'object' && o && p){
            a = o[name]
            b = p[name]
            if (a === b){
                console.log('2121')
                return 0
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1
            }
            return typeof a < typeof b ? -1 : 1
        } else {
            throw {
                name: 'Error',
                message: 'Excepted an Object when sort by ' + name
            }
        }
    }
}

var s = [
    {
        first: 'Joe',
        last: 'Besser'
    },
    {
        first: 'Moe',
        last: 'Howar'
    },
    {
        first: 'Joe',
        last: 'DiRita'
    },
    {
        first: 'Shemp',
        last: 'Howar'
    },
    {
        first: 'Larry',
        last: 'Fine'
    },
]

s.sort(
    by('first')
)
console.log(s)

[
    {
      "first": "Joe",
      "last": "Besser"
    },
    {
      "first": "Joe",
      "last": "DiRita"
    },
    {
      "first": "Larry",
      "last": "Fine"
    },
    {
      "first": "Moe",
      "last": "Howar"
    },
    {
      "first": "Shemp",
      "last": "Howar"
    }
  ]
```

## array.splice(start, deleteCount, item...)

**splice 方法从 array 中移除 1 个或多个元素，并用新的 item 替换它们，参数 start 是从数组 array 中移除元素的开始位置。参数 delteCount 是要移除的元素个数。如果有额外的参数，那些 item 都将插入所移除元素的位置上，它返回一个被包含被移除元素的数组。**

<u>splice 最主要的用处是从一个数组中删除元素。</u>

```js
var m = ['aa', 'a', 'bb',4, 8, 15, 16,15,  23, 43]
var r = m.splice(1,1,'foo', 'bar')

console.log(m)
// [
//     "aa",
//     "foo",
//     "bar",
//     "bb",
//     4,
//     8,
//     15,
//     16,
//     15,
//     23,
//     43
//   ]
console.log(r)
// Array [ "a" ]
```

