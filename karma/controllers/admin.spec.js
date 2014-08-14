'use strict';
describe('Admin controller', function() {
  var adminCtrl, adminModel, scope;
  scope = {};
  adminCtrl = {};
  adminModel = {};
  beforeEach(function() {
    return module('personalDictApp');
  });
  beforeEach(inject(function($rootScope, $controller, AdminModel) {
    scope = $rootScope.$new();
    adminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
    return adminModel = AdminModel;
  }));
  beforeEach(function() {
    adminModel.setUserEmail('bogdan@example.com');
    return scope.getLanguages();
  });
  it('init function should set userEmail as scope variable', function() {
    scope.init();
    return expect(scope.userEmail).toNotBe('');
  });
  describe('placing translations', function() {
    var mockTranslations;
    mockTranslations = {};
    beforeEach(function() {
      mockTranslations = {
        user_email: adminModel.getUserEmail(),
        native_language: 'Serbian',
        translating_to: 'English',
        translations: [
          {
            wordType: 'Nouns',
            words: [
              {
                original: 'Земља',
                translated: 'Earth'
              }
            ]
          }
        ]
      };
      return scope.placeTranslations(mockTranslations);
    });
    it('should fetch word types', function() {
      return expect(scope.translations[0].wordType).toBe('Nouns');
    });
    return it('should have user languages', function() {
      return expect(scope.userLanguages.native_language).toBe('Serbian');
    });
  });
  return describe('languages form section', function() {
    it('should show it when no data', function() {
      scope.displayLangSection(true);
      return expect(scope.uiConfig.languagesSection).toBeTruthy();
    });
    return it('should hide it when there is data', function() {
      scope.displayLangSection(false);
      return expect(scope.uiConfig.languagesSection).toBeFalsy();
    });
  });
});
