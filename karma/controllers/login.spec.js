'use strict';
describe('Login controller', function() {
  var httpBackend, loginCtrl, scope;
  scope = {};
  loginCtrl = {};
  httpBackend = {};
  beforeEach(function() {
    return module('personalDictApp');
  });
  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    loginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
    return httpBackend = $httpBackend;
  }));
  return it('should toggle visibility of create user form', function() {
    scope.toggleUserLoginForm(true);
    return expect(scope.showUserCreateForm).toBeFalsy();
  });
});
