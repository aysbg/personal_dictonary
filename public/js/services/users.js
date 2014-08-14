(function(angular) {
  'use strict';

  var UserService = ['$http', '$q',
    function($http, $q) {
      var userIsAuth = false;

      return {
        get: function() {
          return $http.get('/users');
        },

        // call to POST and create a new member
        insert: function(newUser) {
          return $http.post('/users', newUser);
        },

        checkEmail: function(email) {
          //return ;
          var deferred = $q.defer();

          $http.get('/user/' + email).success(function(result) {
            deferred.resolve(result);
          });

          return deferred.promise;
        },

        hasAccount: function(email, pass) {
          var data = {
            email: email,
            password: pass
          };

          return $http.post('/login', data);
        },

        setAuthStatus: function(value) {
          userIsAuth = value;
        },

        getAuthStatus: function() {
          return userIsAuth;
        }
      };
    }
  ];

  angular.module('personalDictApp.services').factory('UserService', UserService);
})(window.angular);

