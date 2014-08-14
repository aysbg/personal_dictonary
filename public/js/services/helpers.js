(function(angular) {
  'use strict';

  var Helpers = [
    function() {
      this.helloThere = function() {
        return console.log('hello there from the helper service');
      };

      this.randomString = function (stringLength) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
            randomString = '';

        for (var i = 0; i < stringLength; i++) {
          // get us some random number
          var randNum = Math.floor(Math.random() * chars.length);
          // assing the substring of the randomNumber from the chars string
          randomString += chars.substring(randNum, randNum + 1);
        }

        return randomString;
      };
    }
  ];

  angular.module('personalDictApp.services').service('Helpers', Helpers);
})(window.angular);
