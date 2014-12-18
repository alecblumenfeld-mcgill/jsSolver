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
    $scope.clean= function(){
    	for (var x = 0; x < 9; x++)
    		for (var y = 0; y < 9; y++)
    		if ($scope.field[x][y] == null)
    			$scope.field[x][y] = 0;
        return false;

    }
    $scope.solveSudoku = function(field, x, y) {
    var cell = findUnassignedLocation(field, x, y);
    x = cell[0];
    y = cell[1];

    // when solved 
    if (x == -1) {
        console.log("solved");
        return true;
    }

    for (var num = 1; num <= 9; num++) {

        if ( noConflicts(field, x, y, num) ) {   
            field[x][y] = num;

            if ( $scope.solveSudoku(field, x, y) ) {                
                return true;
            }

                    // determsins empy cells   
            field[x][y] = 0;
        }
    }

    // backrack
    return false;
}


function findUnassignedLocation(field, x, y) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
        if (x == 9) {
            done = true;
        }
        else {
            if (field[x][y] == 0) {
                res[0] = x;
                res[1] = y;
                done = true;
            }
            else {
                if (y < 8) {
                    y++;
                }
                else {
                    x++;
                    y = 0;
                }
            }
        }
    }

    return res;
}

function noConflicts(field, x, y, num) {
    return isxOk(field, x, num) && isyOk(field, y, num) && isBoxOk(field, x, y, num);
}

function isxOk(field, x, num) {
    for (var y = 0; y < 9; y++)
        if (field[x][y] == num)
            return false;

    return true;
}
function isyOk(field, y, num) {
    for (var x = 0; x < 9; x++)
    if (field[x][y] == num)
        return false;

    return true;    
}
function isBoxOk(field, x, y, num) {
    x =  Math.floor(x / 3) * 3;
    y =  Math.floor(y / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (field[x + r][y + c] == num)
                return false;

    return true;
}

function printfield(field) {
    var res = "";

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            res += field[i][j];
        }
        res += "\n";
    }
    console.log(res);
}


  });

