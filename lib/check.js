var R = require('ramda');
var esprima = require('esprima');
var type = R.prop('type');
var name = R.prop('name');
var body = R.prop('body');

var isFunctionDecl = R.compose(R.equals('FunctionDeclaration'), type);
var isIdentifier = R.compose(R.equals('Identifier'), type);

var funcDecls = R.compose(R.filter(isFunctionDecl), body);
var identifiers = require('./identifiers');

function uses(body /* Array<Expression|...> */) {
	return R.flatten(body.map(identifiers));
}

function checkOne(fun) {
	var funBody = R.compose(body, body);
	return {
		name: R.path(['id', 'name'], fun),
		args: R.compose(R.map(name), R.prop('params'))(fun),
		uses: uses(funBody(fun))
	};
}

function check(js /* string */) {
        var t /* Tree */ = esprima.parse(js);
	return identifiers(t);
	//return t;
}

module.exports = check;
