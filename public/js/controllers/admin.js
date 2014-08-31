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
//        $scope.userEmail = AdminModel.getUserEmail();
        $scope.userEmail = 'nina@bogi.com';
        $scope.uiConfig.showTranslationTable = true;
        $scope.getTranslations();
        $scope.getWordTypes();
      };

      /**
       * Function to retrieve translations for the logged in user
       */
      $scope.getTranslations = function () {
        // fetch the translations
        LangService.getUserLangs($scope.userEmail)
          .success(function(data) {
            console.log(data);

            if (data.length > 0) {
//              $scope.placeTranslations(data);
//              $scope.displayLangSection(false);
              $scope.uiConfig.showTranslationTable = true;
            } else {
//              $scope.displayLangSection(true);
              $scope.uiConfig.showTranslationTable = false;
            }
          })
          .error(function() {
            console.log("there was an error getting users translations!");
          });
      };

      /**
       * Add new translation
       */
      $scope.addNewTranslations = function () {
        // check if all fields have been entered
        if (checkInputValues() === true) {
          var newTranslation = {
            user_email: $scope.userEmail,
            translating_to: $scope.transLanguages.toLanguage,
            word_type: $scope.newTranslation.wordType,
            words: [{
              original: $scope.newTranslation.original,
              translated: $scope.newTranslation.translated
            }]
          };

          LangService.addNewTranslation(newTranslation)
            .success(function() {
              $scope.getTranslations();
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
       * Adds new types of words
       */
      $scope.addNewWordType = function (isFormValid) {
        if (isFormValid) {
          var data = {
            name: $scope.newWordType
          };

          LangService.addWordType(data)
            .success(function () {
              $scope.getTranslations();
              $scope.getWordTypes();
              AlertService.show('success', 'New word type added', 2500);
            })
            .error(function (status) {
              console.log("there was something wrong adding word type: " + status);
            });
        }
      };

      $scope.getWordTypes = function () {
        LangService.getWordTypes()
          .success(function(data) {
            $scope.wordTypes = data;
          })
          .error(function() {
            console.log('there was something wrong fetching word types');
          });
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
// fix this
//        if ($scope.transLanguages.toLanguage === undefined) {
//          return "Select translating language";
//        }

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
