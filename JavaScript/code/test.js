function idnetify() {
	return this.name.toUpperCase()
}

function speak() {
	var greeting  = 'hello im ' + idnetify.call( this )
	console.log( greeting )
}

var me = {
	name: 'kely'
}

var you = {
	name: 'reader'
}

idnetify.call( me ) // "KELY"
idnetify.call( you ) // "READER"
	
speak.call( me ) // hello im KELY
speak.call( you ) // hello im READER

