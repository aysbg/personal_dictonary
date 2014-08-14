(function(angular) {
  'use strict';

  var ContactCtrl = ['$scope',
    function($scope) {
      $scope.tagline = 'Contact!';
    }
  ];

  angular.module('personalDictApp.controllers').controller('ContactCtrl', ContactCtrl);
})(window.angular);

