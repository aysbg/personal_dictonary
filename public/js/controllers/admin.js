(function (angular) {
  'use strict';

  var AdminCtrl = [
    '$scope', 'AdminModel', 'LangService', 'AlertService',
    function ($scope, AdminModel, LangService, AlertService) {
      $scope.wordTypes = [];
      $scope.transLanguages = {};
      $scope.userEmail = '';
      $scope.userLanguages = {};
      $scope.translations = {};
      $scope.newTranslation = {};
      $scope.uiConfig = {};
      $scope.uiConfig.sidebarVisibility = AdminModel.sidebarVisible;

      /**
       * Controller init function
       */
      $scope.init = function () {
        $scope.userEmail = AdminModel.getUserEmail();
        $scope.uiConfig.showTranslationTable = true;
        $scope.getLanguages();
      };

      $scope.$on('showLangSection', function (event, mass) {
        $scope.uiConfig.languagesSection = mass;
      });
      $scope.$on('showWordTypesSection', function (event, mass) {
        $scope.uiConfig.wordTypesSection = mass;
      });
      $scope.$on('toggleSidebar', function (event, mass) {
        $scope.uiConfig.sidebarVisibility = mass;
      });

      /**
       * Adds new types of words
       */
      $scope.addNewWordType = function (isFormValid) {
        if (isFormValid) {
          var data = {
            user_email: $scope.userEmail,
            native_language: $scope.transLanguages.fromLang,
            translating_to: $scope.transLanguages.toLang,
            translations: [
              {
                wordType: $scope.newWordType,
                words: []
              }
            ]
          };

          LangService.addWordType(data)
            .success(function () {
              $scope.getLanguages();
              AlertService.show('success', 'New word type added', 2500);
            })
            .error(function (status) {
              console.log("there was something wrong adding word type: " + status);
            });
        }
      };

      /**
       * Add new translation
       */
      $scope.addNewTrans = function () {
        // check if all fields have been entered
        if (checkInputValues() === true) {
          var newTranslation = {
            user_email: $scope.userEmail,
            native_language: $scope.transLanguages.fromLang,
            translating_to: $scope.transLanguages.toLang,
            wordType: $scope.newTranslation.wordType,
            words: {
              original: $scope.newTranslation.original,
              translated: $scope.newTranslation.translated
            }
          };

          LangService.addNewTranslation(newTranslation)
            .success(function() {
              $scope.getLanguages();
              $scope.newTranslation = {};
            })
            .error(function(status) {
              console.log("There was something wrong adding new translation: " + status);
            });

        } else {
          AlertService.show('danger', checkInputValues(), 2500);
        }

      };

      /**
       * Update Translation
       *
       * @param changedFrom
       * @param changedTo
       * @param fieldType
       * @param wordType
       */
      $scope.editTranslation = function (changedFrom, changedTo, fieldType, wordType) {
        var changedWords = [],
            updateData = {};

        $scope.translations.forEach(function (trans) {
          // find words for given wordType
          if (trans.wordType === wordType) {
            changedWords = trans.words;
          }
        });

        // iterate through all words for selected wordType
        for (var i = 0; i < changedWords.length; i++) {
          if (changedWords[i][fieldType] === changedFrom) {
            changedWords[i][fieldType] = changedTo;
          }
        }

        updateData = {
          user_email: $scope.userEmail,
          wordType: wordType,
          words: changedWords
        };

        LangService.updateTranslation(updateData)
          .success(function () {
            console.log("great success!");
          })
          .error(function (status) {
            console.log("There has been an error updating translation: " + status);
          });
      };

      /**
       * Delete translation
       *
       * @param word
       * @param wordType
       */
      $scope.deleteTranslation = function (word, wordType) {

        var wordPack = {
          user_email: $scope.userEmail,
          wordType: wordType,
          original: word.original,
          translated: word.translated
        };

        LangService.removeTranslation(wordPack)
          .success(function() {
            $scope.getLanguages();
            AlertService.show('success', 'Translation has been successfully removed', 2500);
          })
          .error(function(status) {
            console.log("There was an error deleting a translation: " + status);
          });
      };

      /**
       * Sets languages for translation
       */
      $scope.setLanguages = function () {
        var setLangs = {
          user_email: $scope.userEmail,
          native_language: $scope.newLang.native,
          translating_to: $scope.newLang.translate,
          translations: []
        };

        LangService.setLangs(setLangs)
          .success(function() {
            AlertService.show('success', 'Languages set!', 2500);
            $scope.getLanguages();
          })
          .error(function(status) {
            console.log("there was an error setting new langs: " + status);
          });
      };

      /**
       * Gets user inserted languages for translation packs
       */
      $scope.getLanguages = function () {

        LangService.getUserLangs($scope.userEmail)
          .success(function(data) {
            // if there are already defined translations, show chooser
            if (data.length > 0) {
              $scope.placeTranslations(data);
              $scope.displayLangSection(false);
              $scope.uiConfig.showTranslationTable = true;
            } else {
              $scope.displayLangSection(true);
              $scope.uiConfig.showTranslationTable = false;
            }
          })
          .error(function(data) {
            console.log("there was an error getting new langs: " + data);
          })
      };

      /**
       * Set translation data to correct objects for easier showing in the UI
       * @param data
       */
      $scope.placeTranslations = function (data) {
        data.length > 0 ? $scope.userLanguages = data[0] : $scope.userLanguages = data;
        $scope.translations = $scope.userLanguages.translations;

        $scope.transLanguages.listNative = [];
        $scope.transLanguages.listTransTo = [];

        for(var i = 0; i < data.length; i++) {
          $scope.transLanguages.listNative.push(data[i].native_language);
          $scope.transLanguages.listTransTo.push(data[i].translating_to);
        }

        $scope.transLanguages.fromLang = $scope.transLanguages.listNative[0];
        $scope.transLanguages.toLang = $scope.transLanguages.listTransTo[0];

        $scope.uiConfig.wordTypesSection = ($scope.translations.length === 0);
      };

      /**
       * Set visibility of the language section
       * @param status
       */
      $scope.displayLangSection = function (status) {
        // hide languages selection section
        $scope.uiConfig.languagesSection = status;
        AdminModel.changeLangSecVisibility($scope.uiConfig.languagesSection);
        $scope.transLanguages.addGroup = status;
      };

      /**
       * Toggle visibility of the languages section
       */
      $scope.toggleLanguagesSections = function () {
        $scope.transLanguages.addGroup = !$scope.transLanguages.addGroup;
      };

      /**
       * Input value checker
       */
      var checkInputValues = function () {
        if ($scope.transLanguages.fromLang === undefined) {
          return "Select original language";
        }

        if ($scope.transLanguages.toLang === undefined) {
          return "Select translating language";
        }

        if ($scope.newTranslation.wordType === undefined) {
          return "Select type of word";
        }

        if ($scope.newTranslation.original === undefined) {
          return "Enter subject to translate";
        }

        if ($scope.newTranslation.translated === undefined) {
          return "Enter translation";
        }

        return true;
      };

    }
  ];

  var NaviCtrl = [
    '$scope', '$location', 'AdminModel', 'AlertService',
    function($scope, $location, AdminModel, AlertService) {
      $scope.userEmail = undefined;
      $scope.showChooseLangLink = true;
      $scope.showWordTypesLink = true;
      $scope.showSidebar = true;

      $scope.$on('userLoginEmail', function() {
        $scope.userEmail = AdminModel.getUserEmail();
      });

      $scope.showLanguagesSection = function (state) {
        AdminModel.changeLangSecVisibility(state);
        $scope.showChooseLangLink = !$scope.showChooseLangLink;
      };

      $scope.showWordTypesSection = function (state) {
        AdminModel.changeWordTypesVisibility(state);
        $scope.showWordTypesLink = !$scope.showWordTypesLink;
      };

      $scope.toggleSidebar = function () {
        $scope.showSidebar = !$scope.showSidebar;
        AdminModel.changeSidebarVisibility($scope.showSidebar);
      };

      /**
       * Logout function
       */
      $scope.logoutUser = function () {
        $scope.userEmail = '';
        AdminModel.setUserEmail(undefined);
        $location.path('/login');
        AlertService.show('info', 'You have logged out successfully', 2500);
      };
    }
  ];

  angular.module('personalDictApp.controllers').controller('AdminCtrl', AdminCtrl);
  angular.module('personalDictApp.controllers').controller('NaviCtrl', NaviCtrl);

})(window.angular);
