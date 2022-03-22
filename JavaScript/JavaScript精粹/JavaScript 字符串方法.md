# JavaScript 字符串方法

## string.charAt(pos)

chartAt 方法返回在 string 中 pos 位置处的字符。如果 pos 小于 0 或大于等于字符串的长度 string.length，它会返回字符串。JavaScript 没有字符类型。这个方法返回的结果是一个字符串。

```js
var name = 'Curly'
var initial = name.charAt(0)
// initial 是 'C'
```

 charAt 可以像这样实现：

```js
String.method('charAt', function() {
    return this.slice(0, 1)
})
```

## string.charCodeAt(pos)

charCodeAt 方法同 charAt 一样，只不过它返回的不是一个字符串，而是以整数形式表示的 string 中的 pos 位置处的字符串码位。如果 pos 小于 0 或大于等于字符串的长度 string.length ，它返回 NaN。

```js
var name = 'Curly'
var initial = name.charCodeAt(0)
console.log(initial) // 67
```

## string.concat(string...)

concat 方法通过将其他的字符串连接在一起来构造一个新的字符串。它很少很使用，因为 + 运算符更为方便：

```js
var s = 'C'.concat('a', 't')
console.log(s) // Cat
```

## string.indexof(searchString, position)

indexOf 方法在 string 内查找另一个字符串 searchString，如果它被找到，则返回第一个匹配字符串的位置，否则返回 -1。可选参数为 position 可设置从 string 的某个指定位置开始查找。

```js
var text = 'Mississippi'
var a = text.indexOf('ss')
var b = text.indexOf('ss', 3)
var c = text.indexOf('ss', 6)

console.log(a) // 2
console.log(b) // 5
console.log(c) // -1
```

## string.lastIndexOf(searchString, position)

lastIndexOf 方法和 indexOf 方法类似，只不过它是从该字符串的末尾开始查找，而不是开头。

```js
var text = 'Mississippi'
var a = text.lastIndexOf('ss')
var b = text.lastIndexOf('ss', 3)
var c = text.lastIndexOf('ss', 6)

console.log(a) // 5
console.log(b) // 2
console.log(c) // 5
```

## string.localCompare(that)

localCompare 方法比较两个字符串，如何