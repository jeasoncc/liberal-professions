function idnetify(context) {
	return context.name.toUpperCase()
}

function speak(context) {
	var greeting  = 'hello im ' + idnetify( context )
	console.log( greeting )
}

var me = {
	name: 'kely'
}

var you = {
	name: 'reader'
}

idnetify( me ) // "KELY"
idnetify( you ) // "READER"

speak( me ) // hello im KELY
speak( you ) // hello im READER