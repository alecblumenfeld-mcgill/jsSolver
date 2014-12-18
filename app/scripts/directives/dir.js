'use strict';

/**
 * @ngdoc directive
 * @name suduWebApp.directive:dir
 * @description
 * # dir
 */

angular.module('suduWebApp')
  .directive('sq', function($compile) {
    return {
        restrict: 'E',
        compile: function(element, attrs) {
            var html = "<input id='inputId' type='number' id='inputBox'  ng-model='" + attrs.dirModel + "' />";
            element.replaceWith(html);
            return function(scope, element, attrs, ngModel) {
                $compile(angular.element(element))(scope);
            };
        },
    };
});
