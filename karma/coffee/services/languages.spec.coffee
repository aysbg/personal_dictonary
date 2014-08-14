'use strict'

describe 'Services: Languages', () ->
  langService = {}
  httpBackend = {}

  beforeEach ->
    module('personalDictApp')

  beforeEach inject((LangService, $httpBackend) ->
    langService = LangService
    httpBackend = $httpBackend
  )

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()

  describe 'translation languages', () ->
    afterEach ->
      httpBackend.flush()

    it 'gets the languages',() ->
      email = 'test@test.com'
      httpBackend.expectGET('/languages/' + email).respond(200, '');

      languages = langService.getUserLangs(email)
      expect(languages).not.toBe(undefined)

    it 'sets the languages',() ->
      setLanguages = {
        user_email: 'test@test.com'
        native_language: 'Serbian'
        translating_to: 'English'
        translations: []
      }

      httpBackend.expectPOST('/languages', setLanguages).respond(200, 'success')
      langService.setLangs(setLanguages)
        .then (result) ->
          expect(result.data).toBe('success')

  it 'can set word type', () ->
    result = undefined
    data = {
      user_email: 'test@test.com'
      native_language: 'Serbian'
      translating_to: 'English'
      translations: [
        {
          wordType: 'Nouns',
          words: []
        }
      ]
    }

    httpBackend.expectPOST('/languages/types', data).respond(200, '')
    langService.addWordType(data).then (res) ->
      result = res.config.data.translations[0].wordType

    httpBackend.flush()
    expect(result).toBe('Nouns')

  describe 'translations', () ->
    afterEach ->
      httpBackend.flush()

    it 'can add new one', () ->
      newTranslation = {
        user_email: 'test@test.com'
        native_language: 'Serbian'
        translating_to: 'English'
        wordType: 'Nouns'
        words: {
          original: 'Нешто'
          translated: 'Something'
        }
      }

      httpBackend.expectPOST('/languages/translations/insert', newTranslation).respond(200, 'success')
      langService.addNewTranslation(newTranslation).then (res) ->
        expect(res.data).toBe('success')

    it 'can update one', () ->
      updateData = {
        user_email: 'test@test.com'
        wordType: 'Nouns'
        words: { original: 'Нешто', translated: 'Something Else' }
      }

      httpBackend.expectPOST('/languages/translations/update', updateData).respond(200, 'success')
      langService.updateTranslation(updateData).then (res) ->
        expect(res.data).toBe('success')

    it 'can remove one', () ->
      deleteData = {
        user_email: 'test@test.com'
        wordType: 'Nouns'
        original: 'Нешто'
        translated: 'Something Else'
      }

      httpBackend.expectPOST('/languages/translations/delete', deleteData).respond(200, 'success')
      langService.removeTranslation(deleteData)
