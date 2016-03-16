var prettyjson = require('prettyjson');

//var t0 = 'var x = 42; function f(a, b, c) { a++; y++; }';
//var t0 = 'var x = 42; function f(a, b, c) { var x = a; y++; }';
var t0 = "'use strict'; angular.module('components').factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, Either, R) { var currentUser = R; }); ";
//var t0 = "function Auth($location, $rootScope, $http, User, $cookieStore, $q, Either, R) { $q.when(f()); Either.map($location.reload(true));} function banana(x) {x.f()+y}";
var check = require('./lib/check');

var r = check(t0);

console.log(prettyjson.render(r));
