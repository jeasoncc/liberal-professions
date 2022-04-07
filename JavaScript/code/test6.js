// function foo() {
// 	console.log( this.a )
// }

// var obj = {
// 	a: 2,
// 	foo: foo
// }

// var bar = obj.foo // 函数别名
 
// var a = 'oops, global' // a 是全局对象的属性

// bar() // 'oops, blobal'

// function foo() {
// 	console.log( this.a )
// }

// var obj = {
// 	a: 2,
// 	foo: foo
// }

// var a = 'oops, global' // a 是全局对象
 
// setTimeout( obj.foo, 100) // oops, global

// function foo() {
// 	console.log( this.a )
// }

// var obj = {
// 	a: 2
// }

// foo.call( obj ) // 2





function foo(something){
	console.log( this.a, something)
	return this.a + something
}

var obj = {
	a: 2
}

var bar = function() {
	return foo.apply(obj, arguments)
}

var b = bar( 3 )
console.log( b )





function foo(something) {
	console.log ( this.a, something)
	return this.a + something
}

// 简单的辅助函数
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments )
	}
}

var obj = {
	a: 2
}

var bar = bind( foo, obj )

var b = bar( 3 )

console.log( b )



