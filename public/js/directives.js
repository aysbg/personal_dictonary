(function(angular) {
  'use strict';

  angular.module('personalDictApp.directives')

    .directive('membershipList', function() {
      return {
          restrict: 'A',

          scope: {
            memberInfo: '=info'
          },

          link: function(scope, element, attrs) {
            // cool way to get some data... ;)
            // console.log(scope.memberInfo);

            element.on('click', function() {
              element.parent().find('ul').toggleClass('active');
            });
          }
        };
    })

    .directive('editField', function() {
      var editTemplate = '<div class="edit-field">'
          +'<span ng-hide="editForm.editorEnabled" ng-click="enableEditor()">'
            +'{{value}}'
          +'</span>'
          +'<div ng-show="editForm.editorEnabled">'
            +'<input ng-model="editForm.editableValue">'
            +'<a href="#" href="#" ng-click="save()">save</a>'
            +' or '
            +'<a href="#" ng-click="disableEditor()">cancel</a>.'
          +'</div>'
        +'</div>';

      return {
        restrict: 'A',
        replace: true,
        template: editTemplate,

        scope: {
          value: '=editField',
          fieldType: '@',
          wordType: '@',
          adminCtrlFn: '&callbackFn'
        },

        controller: function ($scope) {
          $scope.editForm = {
            editableValue: $scope.value,
            editorEnabled: false
          };

          $scope.enableEditor = function () {
            $scope.editForm.editorEnabled = true;
            $scope.editForm.editableValue = $scope.value;
          };

          $scope.disableEditor = function () {
            $scope.editForm.editorEnabled = false;
          };

          $scope.save = function() {
            // call Admin function that will save the edited field
            $scope.adminCtrlFn({
              changedFrom: $scope.value,
              changedTo: $scope.editForm.editableValue,
              fieldType: $scope.fieldType,
              wordType: $scope.wordType
            });
            // change it for the user to see
            $scope.value = $scope.editForm.editableValue;
            $scope.disableEditor();
          };
        }
      }
    });

})(window.angular);

