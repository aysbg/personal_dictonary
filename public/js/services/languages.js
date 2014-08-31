(function(angular) {
  'use strict';

  var LangService = ['$http', '$q',
    function($http, $q) {
      var userIsAuth = false;

      return {

        getUserLangs: function (email) {
          return $http.get('/translations/' + email);
        },

        setLangs: function (newLangs) {
          return $http.post('/translations', newLangs);
        },

        addWordType: function (data) {
          return $http.post('/wordtypes', data);
        },

        getWordTypes: function () {
          return $http.get('/wordtypes');
        },

        addNewTranslation: function (data) {
          return $http.post('/translations/insert', data);
        },

        updateTranslation: function (data) {
          return $http.post('/translations/update', data);
        },

        removeTranslation: function (wordPack) {
          return $http.post('/translations/delete', wordPack);
        }

      };
    }
  ];

  angular.module('personalDictApp.services').factory('LangService', LangService);
})(window.angular);

