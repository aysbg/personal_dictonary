'use strict'

describe 'Admin controller', () ->
  scope = {}
  adminCtrl = {}
  adminModel = {}

  beforeEach ->
    module('personalDictApp')

  beforeEach inject(($rootScope, $controller, AdminModel) ->
    scope = $rootScope.$new()
    adminCtrl = $controller('AdminCtrl', $scope: scope)
    adminModel = AdminModel
  )

  beforeEach ->
    adminModel.setUserEmail('bogdan@example.com')
    scope.getLanguages()

  it 'init function should set userEmail as scope variable', () ->
    scope.init()
    expect(scope.userEmail).toNotBe('')

  describe 'placing translations', () ->
    mockTranslations = {}

    beforeEach ->
      mockTranslations = {
        user_email: adminModel.getUserEmail()
        native_language: 'Serbian'
        translating_to: 'English'
        translations: [
          {
            wordType: 'Nouns'
            words: [
              {
                original: 'Земља'
                translated: 'Earth'
              }
            ]
          }
        ]
      }

      scope.placeTranslations(mockTranslations)

    it 'should fetch word types', () ->
      expect(scope.translations[0].wordType).toBe('Nouns')

    it 'should have user languages', () ->
      expect(scope.userLanguages.native_language).toBe('Serbian')

  describe 'languages form section', () ->
    it 'should show it when no data', () ->
      scope.displayLangSection(true)
      expect(scope.uiConfig.languagesSection).toBeTruthy()

    it 'should hide it when there is data', () ->
      scope.displayLangSection(false)
      expect(scope.uiConfig.languagesSection).toBeFalsy()




