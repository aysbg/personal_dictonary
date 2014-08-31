'use strict';
describe('Services: Users', function() {
  var httpBackend, userService;
  userService = {};
  httpBackend = {};
  beforeEach(function() {
    return module('personalDictApp');
  });
  beforeEach(inject(function(UserService, $httpBackend) {
    userService = UserService;
    return httpBackend = $httpBackend;
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });
  it("should set and get user status", function() {
    var userIsAuth;
    userService.setAuthStatus(true);
    userIsAuth = userService.getAuthStatus();
    return expect(userIsAuth).toBeTruthy();
  });
  return describe("has http requests", function() {
    afterEach(function() {
      return httpBackend.flush();
    });
    it('can get list of users', function() {
      var users;
      httpBackend.expectGET('/users').respond(200, '');
      users = userService.get();
      return expect(users).not.toBe(void 0);
    });
    it('can create new user', function() {
      var newUser;
      newUser = {
        name: 'Jon Doe',
        email: 'jon@doe.com',
        password: 'password',
        native_language: 'serbian',
        date: '20140625'
      };
      httpBackend.expectPOST('/users', newUser).respond(200, '');
      return userService.insert(newUser);
    });
    it('can check if account exists', function() {
      var uEmail, uPassword, user;
      uEmail = 'jon@doe.com';
      uPassword = 'password';
      httpBackend.expectPOST('/login', {
        email: uEmail,
        password: uPassword
      }).respond(201, '');
      user = userService.hasAccount(uEmail, uPassword);
      return expect(user).not.toBe(void 0);
    });
    return it('can check for email', function() {
      var email, respondData, result;
      result = {};
      email = 'bogdan@example.com';
      respondData = {
        name: 'Bogdan',
        email: 'bogdan@example.com',
        password: '',
        register_date: '20150520'
      };
      httpBackend.expectGET('/user/' + email).respond(200, respondData);
      return userService.checkEmail(email).then(function(response) {
        return expect(response).toEqual(respondData);
      });
    });
  });
});
