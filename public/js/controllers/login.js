(function(angular) {
  'use strict';

  var LoginCtrl = ['$scope', '$http','$location', 'AdminModel', 'UserService', 'AlertService', 'Helpers',
    function($scope, $http, $location, AdminModel, UserService, AlertService, Helpers) {
      $scope.showUserCreateForm = true;
      $scope.newUser = {};

      $scope.createNewUser = function (isFormValid) {

        var hasEmail = UserService.checkEmail($scope.newUser.email);
        hasEmail.then(function (result) {
          // If object has value - email in use
          if (isEmpty(result) === false) {
            AlertService.show('danger', 'Email is already in use, please choose another one.', 2500);
            $scope.newUser.email = '';
            return;
          }

          // if our form has been validated properly
          if (isFormValid) {
            var newUser = {
              name: $scope.newUser.name,
              email: $scope.newUser.email,
              password: Helpers.randomString(16),
              native_language: $scope.newUser.native
            };

            UserService.insert(newUser)
              .success(function() {
                $scope.newUser = {};
                $scope.successRegister = true;
                $scope.showUserCreateForm = false;
                $scope.generatedPassword = newUser.password;

                AlertService.show('info', 'You registration was a success', 3000);

              })
              .error(function(status) {
                console.log("There has been some error while inserting new user: " + status);
              });
          }
        });
      };

      $scope.toggleUserLoginForm = function (shown) {
        if (shown) {
          $scope.showUserCreateForm = false;
          $scope.showLoginUserForm = true;
        } else {
          $scope.showUserCreateForm = true;
          $scope.showLoginUserForm = false;
        }
      };

      $scope.loginUser = function (isFormValid) {
        if (isFormValid) {
          var email = $scope.loginUser.email;

          UserService.hasAccount($scope.loginUser.email, $scope.loginUser.password)
            .success(function() {
              UserService.setAuthStatus(true);
              AdminModel.setUserEmail(email);
              AlertService.show('success', 'Log in successful', 2500);

              $location.path('/dashboard');
            })
            .error(function(status) {
              console.log("something went wrong: " + status);
            });
        }
      };

      /**
       * Check if Object is empty
       * @param obj
       * @returns {boolean}
       */
      function isEmpty(obj) {
        return Object.keys(obj).length === 0;
      }

    }
  ];

  angular.module('personalDictApp.controllers').controller('LoginCtrl', LoginCtrl);
})(window.angular);

