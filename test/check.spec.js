var R = require('ramda');
var jsc = require('jsverify');
var check = require('../lib/check');

describe('check', function () {

  var separator = jsc.elements(["\n", ';']);
  jsc.property('For n expressions x0..n++, x0..n is in .uses', jsc.nearray(jsc.nat), separator, function (xs, sep) {
    var varNames = xs.map(function (n) {
      return 'x' + n;
    });
    var ops = varNames.map(function (n) {
      return n + '++';
    })
    var code = ops.join(sep);
    var r = check('function test() { ' + code + '}');
    return R.equals(varNames, r[0].uses);
  });

});
