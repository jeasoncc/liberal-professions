function foo(num) {
	// body...
	console.log('foo: ' + num)

	// 记录 foo 被调用的次数
	this.count++
}

foo.count = 0

var i

for (i = 10; i >= 0; i--) {
	if(i > 5) {
		foo(i)
	}
}

// foo: 10 debugger eval code:3:10
// foo: 9 debugger eval code:3:10
// foo: 8 debugger eval code:3:10
// foo: 7 debugger eval code:3:10
// foo: 6 debugger eval code:3:10

// foo 被调用了多少次？
console.log(foo.count) // 0