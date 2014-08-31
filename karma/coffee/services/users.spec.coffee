'use strict'

describe 'Services: Users', () ->
  userService = {}
  httpBackend = {}

  beforeEach ->
    module('personalDictApp')

  beforeEach inject((UserService, $httpBackend) ->
    userService = UserService
    httpBackend = $httpBackend
  )

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()

  it "should set and get user status", () ->
    userService.setAuthStatus(true)
    userIsAuth = userService.getAuthStatus()

    expect(userIsAuth).toBeTruthy()

  describe "has http requests", () ->
    afterEach ->
      httpBackend.flush()

    it 'can get list of users', () ->
      httpBackend.expectGET('/users').respond(200, '');

      users = userService.get()
      expect(users).not.toBe(undefined)


    it 'can create new user', () ->
      newUser = {
        name: 'Jon Doe'
        email: 'jon@doe.com'
        password: 'password'
        native_language: 'serbian'
        date: '20140625'
      }

      httpBackend.expectPOST('/users', newUser).respond(200, '')
      userService.insert(newUser)


    it 'can check if account exists', () ->
      uEmail = 'jon@doe.com'
      uPassword = 'password'

      httpBackend.expectPOST('/login', { email: uEmail, password: uPassword }).respond(201, '')
      user = userService.hasAccount(uEmail, uPassword)

      expect(user).not.toBe(undefined)


    it 'can check for email', () ->
      result = {}
      email = 'bogdan@example.com'
      respondData = {
        name: 'Bogdan'
        email: 'bogdan@example.com'
        password: ''
        register_date: '20150520'
      }

      httpBackend.expectGET('/user/' + email).respond(200, respondData)

      userService.checkEmail(email).then (response) ->
        expect(response).toEqual(respondData)

