(function () {
  "use strict";

  angular.module('personalDictApp.services', []);
  angular.module('personalDictApp.controllers', []);
  angular.module('personalDictApp.models', []);
  angular.module('personalDictApp.directives', []);

  var personalDictApp = angular.module('personalDictApp', [
    'ngRoute',
    'ui.bootstrap',
    'personalDictApp.services',
    'personalDictApp.controllers',
    'personalDictApp.models',
    'personalDictApp.directives'
  ]);

  personalDictApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

      // home page
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'LoginCtrl',
        requireLogin: false
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        requireLogin: false
      })

      .when('/dashboard', {
        templateUrl: 'views/admin/dashboard.html',
        controller: 'AdminCtrl',
        requireLogin: true
      })

      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        requireLogin: false
      })

      //
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        requireLogin: false
      })

      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  }])
  
    .run(['$rootScope', '$location', 'UserService', 'AlertService',
      function ($rootScope, $location ,UserService, AlertService) {
        // Everytime the route in our app changes check auth status
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          // if you're logged out send to login page.
          if (next.requireLogin && !UserService.getAuthStatus()) {
            $location.path('/login');
            AlertService.show('danger', 'You need to be logged in to see this page', 2500);
            event.preventDefault();
          }
        });
      }
      ]);
})();

