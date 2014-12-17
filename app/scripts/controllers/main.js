'use strict';

/**
 * @ngdoc function
 * @name suduWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the suduWebApp
 */
angular.module('suduWebApp')
  .controller('MainCtrl', function ($scope) {
 	$scope.r00= 0;
 	$scope.r01= 0;
 	$scope.r02= 0;
 	$scope.r03= 0;
 	$scope.r04= 0;
 	$scope.r05= 0;
 	$scope.r06= 0;
 	$scope.r07= 0;
 	$scope.r08 = 0;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.field = [
        [0,0,8,4,0,3,5,0,6],
        [0,0,3,1,0,2,0,0,4],
        [0,4,5,7,0,0,0,9,0],
        [6,9,0,0,0,5,0,0,7],
        [0,8,0,0,0,0,0,5,0],
        [4,0,0,3,0,0,0,1,8],
        [0,7,0,0,0,6,2,4,0],
        [1,0,0,5,0,7,8,0,0],
        [8,0,6,9,0,1,3,0,0]
    ];
    $scope.updateField = function(x,y,value){
    	$scope.field[x][y]=value;
    };
    
    $scope.logField = function(){
    	console.log($scope.field);
    };


  });
