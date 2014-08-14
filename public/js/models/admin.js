(function(angular) {
  'use strict';

  var AdminModel = [
    '$rootScope',
    function($rootScope) {
      var userEmail = "";

      return {

        setUserEmail: function (value) {
          userEmail = value;
          $rootScope.$broadcast('userLoginEmail', userEmail);
        },

        getUserEmail: function () {
          return userEmail;
        },

        langSecVisibile: true,

        changeLangSecVisibility: function (state) {
          this.langSecVisibile = state;
          $rootScope.$broadcast('showLangSection', state);
        },

        wordTypesSecVisible: true,

        changeWordTypesVisibility: function (state) {
          this.wordTypesSecVisible = state;
          $rootScope.$broadcast('showWordTypesSection', state);
        },

        sidebarVisible: true,

        changeSidebarVisibility: function (state) {
          this.sidebarVisible = state;
          $rootScope.$broadcast('toggleSidebar', state);
        }
      };
    }
  ];

  angular.module('personalDictApp.models').factory('AdminModel', AdminModel);
})(window.angular);

