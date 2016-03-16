var R = require('ramda');
var type = R.prop('type');
var name = R.prop('name');

var stack = [];

function identifiers(x) {
  function add(name) {
    if (stack.length > 0) {
      stack[stack.length - 1].uses.push(name);
    }
  }
  switch (type(x)) {
    case 'Program':
      return R.flatten(x.body.map(identifiers));
    case 'BlockStatement':
      return R.flatten(x.body.map(identifiers));
    case 'FunctionDeclaration':
      stack.push({ name: x.id.name, uses: [], params: x.params.map(name) })
      return identifiers(x.body);
    case 'FunctionExpression':
      stack.push({ name: x.id.name, uses: [], params: x.params.map(name) })
      return identifiers(x.body);
    case 'Identifier':
      add(x.name);
      return [x.name];
    case 'ExpressionStatement':
      return identifiers(x.expression);
    case 'VariableDeclaration':
      x.declarations.forEach(function (x) {
        add(R.path(['init','name'])(x));
      });
      return x.declarations.map(R.path(['init','name']));
    case 'UpdateExpression':
      return [identifiers(x.argument)];
    case 'CallExpression':
      var calleeName = identifiers(x.callee);
      return [calleeName].concat(x.arguments.map(identifiers));
    case 'MemberExpression':
      return [identifiers(x.object)];
    case 'BinaryExpression':
      return identifiers(x.left).concat(identifiers(x.right));
    case 'VariableDeclaration':
      return x.declarations.map(R.path(['init','name']));
    default:
      console.log('do nothing for', type(x), x);
      return [];
  }
}

module.exports = function (x) {
  var r = identifiers(x);
  var s = R.clone(stack);
  stack.splice(0);
  return s;
}
