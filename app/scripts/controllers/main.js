'use strict';

/**
 * @ngdoc function
 * @name suduWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the suduWebApp
 */
angular.module('suduWebApp')
  .controller('MainCtrl', function ($scope,  $location) {
    $scope.go = function ( path ) {
  $location.path( path );
};
    $scope.bench;
$scope.clickToOpen = function () {
        ngDialog.open({ 
            template: 'popup',
            showClose:'false'
         });
    };
  	$scope.isSolved=false;
    $scope.field = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]

    ];
    $scope.hard = [
        [0,0,0,0,0,0,0,0,0],
        [0,1,0,6,2,0,0,9,0],
        [0,0,2,0,0,9,3,1,0],
        [0,0,4,0,0,0,0,0,0],
        [0,0,8,0,0,0,1,0,0],
        [0,3,0,0,0,0,5,0,0],
        [0,6,9,1,0,0,4,0,0],
        [0,8,0,0,7,3,0,5,0],
        [0,0,0,0,0,0,0,0,0]

    ];
    $scope.med = [
        [9,1,3,6,0,0,0,0,0],
        [0,0,0,0,8,7,0,9,0],
        [0,0,0,0,0,0,0,4,0],
        [5,8,0,0,4,6,0,0,7],
        [0,0,0,0,5,0,0,0,0],
        [7,0,0,8,9,0,0,5,6],
        [0,9,0,0,0,0,0,0,0],
        [0,6,0,3,7,0,0,2,9],
        [0,0,0,0,0,5,3,6,4]

        ];
    $scope.easy = [
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
    $scope.premadeEasy = function(){
        for (var x = 0; x < 9; x++){
                    for (var y = 0; y < 9; y++){
                                    $scope.field[x][y] = $scope.easy[x][y];
                 console.log($scope.field[x][y]);}}


    };
    $scope.premadeMed = function(){
        for (var x = 0; x < 9; x++){
                    for (var y = 0; y < 9; y++){
                                    $scope.field[x][y] = $scope.med[x][y];
                 console.log($scope.field[x][y]);}}


    };
    $scope.premadeHard = function(){
        for (var x = 0; x < 9; x++){
                    for (var y = 0; y < 9; y++){
                                    $scope.field[x][y] = $scope.hard[x][y];
                 console.log($scope.field[x][y]);}}


    };
    
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
    $scope.reset= function(){
    	for (var x = 0; x < 9; x++)
    		for (var y = 0; y < 9; y++)
    		
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
$scope.benchSudoku = function(field, x, y) {
        var t0 = performance.now();
        $scope.solveSudoku(field, x, y);
        var t1 = performance.now();
         $scope.bench =Number(((t1 - t0)).toFixed(4)) ;
     };


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
// }
// (function() {

//         var container = document.getElementById( 'container' ),
//           dlgtrigger = document.querySelector( '[data-dialog]' ),
//           somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog' ) ),
//           dlg = new DialogFx( somedialog, {
//             onOpenDialog : function( instance ) {
//               classie.add( container, 'container--move' );
//             },
//             onCloseDialog : function( instance ) {
//               classie.remove( container, 'container--move' );
//             }
//           } );

//         dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );

//       })();


  });

