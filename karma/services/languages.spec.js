'use strict';
describe('Services: Languages', function() {
  var httpBackend, langService;
  langService = {};
  httpBackend = {};
  beforeEach(function() {
    return module('personalDictApp');
  });
  beforeEach(inject(function(LangService, $httpBackend) {
    langService = LangService;
    return httpBackend = $httpBackend;
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });
  describe('translation languages', function() {
    afterEach(function() {
      return httpBackend.flush();
    });
    it('gets the languages', function() {
      var email, languages;
      email = 'test@test.com';
      httpBackend.expectGET('/languages/' + email).respond(200, '');
      languages = langService.getUserLangs(email);
      return expect(languages).not.toBe(void 0);
    });
    return it('sets the languages', function() {
      var setLanguages;
      setLanguages = {
        user_email: 'test@test.com',
        native_language: 'Serbian',
        translating_to: 'English',
        translations: []
      };
      httpBackend.expectPOST('/languages', setLanguages).respond(200, 'success');
      return langService.setLangs(setLanguages).then(function(result) {
        return expect(result.data).toBe('success');
      });
    });
  });
  it('can set word type', function() {
    var data, result;
    result = void 0;
    data = {
      user_email: 'test@test.com',
      native_language: 'Serbian',
      translating_to: 'English',
      translations: [
        {
          wordType: 'Nouns',
          words: []
        }
      ]
    };
    httpBackend.expectPOST('/languages/types', data).respond(200, '');
    langService.addWordType(data).then(function(res) {
      return result = res.config.data.translations[0].wordType;
    });
    httpBackend.flush();
    return expect(result).toBe('Nouns');
  });
  return describe('translations', function() {
    afterEach(function() {
      return httpBackend.flush();
    });
    it('can add new one', function() {
      var newTranslation;
      newTranslation = {
        user_email: 'test@test.com',
        native_language: 'Serbian',
        translating_to: 'English',
        wordType: 'Nouns',
        words: {
          original: 'Нешто',
          translated: 'Something'
        }
      };
      httpBackend.expectPOST('/languages/translations/insert', newTranslation).respond(200, 'success');
      return langService.addNewTranslation(newTranslation).then(function(res) {
        return expect(res.data).toBe('success');
      });
    });
    it('can update one', function() {
      var updateData;
      updateData = {
        user_email: 'test@test.com',
        wordType: 'Nouns',
        words: {
          original: 'Нешто',
          translated: 'Something Else'
        }
      };
      httpBackend.expectPOST('/languages/translations/update', updateData).respond(200, 'success');
      return langService.updateTranslation(updateData).then(function(res) {
        return expect(res.data).toBe('success');
      });
    });
    return it('can remove one', function() {
      var deleteData;
      deleteData = {
        user_email: 'test@test.com',
        wordType: 'Nouns',
        original: 'Нешто',
        translated: 'Something Else'
      };
      httpBackend.expectPOST('/languages/translations/delete', deleteData).respond(200, 'success');
      return langService.removeTranslation(deleteData);
    });
  });
});
