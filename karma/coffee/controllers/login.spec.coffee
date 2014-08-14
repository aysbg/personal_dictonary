'use strict'

describe 'Login controller', () ->
  scope = {}
  loginCtrl = {}
  httpBackend = {}

  beforeEach ->
    module('personalDictApp')

  beforeEach inject(($rootScope, $controller, $httpBackend) ->
    scope = $rootScope.$new()
    loginCtrl = $controller('LoginCtrl', $scope: scope)
    httpBackend = $httpBackend
  )

  it 'should toggle visibility of create user form', () ->
    scope.toggleUserLoginForm(true)
    expect(scope.showUserCreateForm).toBeFalsy()
