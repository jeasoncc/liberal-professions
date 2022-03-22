#### 箭头函数

由于 JavaScript 中会使用大量的函数，增加简化创建函数方式的语法十分有意义。

```js
var values = [1,21,,212,3,4,21,5]
values.sort(function(a,b){
    return a -b
})
```

现在，让我们看看箭头表达式来做完全相同的事情：

````js
var values = [1,21,,212,3,4,21,5]
values.sort((a,b) => a -b)
````

看到这是多么的简洁了吧。

这种写法不会产生 function 关键字、大括号或着 return 语句导致的混乱。箭头函数语句有着比函数表达式更为简单的方式。