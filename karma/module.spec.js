'use strict';
describe('Module', function() {
  var module;
  module = {};
  beforeEach(function() {
    return module = angular.module('personalDictApp');
  });
  return it('should be registered', function() {
    return expect(module).not.toBe(void 0);
  });
});
