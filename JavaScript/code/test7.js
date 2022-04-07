// function foo(something) {
// 	console.log( this.a, something )
// 	return this.a + something
// }

// var obj = {
// 	a:2
// }

// var bar = foo.bind( obj )

// var b = bar( 3 ) // 2 3
// console.log( b ) // 5

function foo(el) {
	console.log( el, this.id )
}

var obj = {
	id:"awesome"
};

[1, 2, 3].forEach( foo, obj );