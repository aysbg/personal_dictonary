(function(angular) {
  'use strict';

  var LangService = ['$http', '$q',
    function($http, $q) {
      var userIsAuth = false;

      return {

        getUserLangs: function (email) {
          return $http.get('/languages/' + email);
        },

        setLangs: function (newLangs) {
          console.log(newLangs);
          return $http.post('/languages', newLangs);
        },

        addWordType: function (data) {
          return $http.post('/wordtypes', data);
        },

        getWordTypes: function () {
          return $http.get('/wordtypes');
        },

        addNewTranslation: function (data) {
          return $http.post('/languages/translations/insert', data);
        },

        updateTranslation: function (data) {
          return $http.post('/languages/translations/update', data);
        },

        removeTranslation: function (wordPack) {
          return $http.post('/languages/translations/delete', wordPack);
        }

      };
    }
  ];

  angular.module('personalDictApp.services').factory('LangService', LangService);
})(window.angular);

