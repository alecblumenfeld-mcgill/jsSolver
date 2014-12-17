"use strict";

var feild = [
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

// recursive algo
function solveSudoku(feild, x, y) {
    var cell = findUnassignedLocation(feild, x, y);
    x = cell[0];
    y = cell[1];

    // when solved 
    if (x == -1) {
        console.log("solved");
        return true;
    }

    for (var num = 1; num <= 9; num++) {

        if ( noConflicts(feild, x, y, num) ) {   
            feild[x][y] = num;

            if ( solveSudoku(feild, x, y) ) {                
                return true;
            }

                    // determsins empy cells   
            feild[x][y] = 0;
        }
    }

    // backrack
    return false;
}


function findUnassignedLocation(feild, x, y) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
        if (x == 9) {
            done = true;
        }
        else {
            if (feild[x][y] == 0) {
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

function noConflicts(feild, x, y, num) {
    return isxOk(feild, x, num) && isyOk(feild, y, num) && isBoxOk(feild, x, y, num);
}

function isxOk(feild, x, num) {
    for (var y = 0; y < 9; y++)
        if (feild[x][y] == num)
            return false;

    return true;
}
function isyOk(feild, y, num) {
    for (var x = 0; x < 9; x++)
    if (feild[x][y] == num)
        return false;

    return true;    
}
function isBoxOk(feild, x, y, num) {
    x =  Math.floor(x / 3) * 3;
    y =  Math.floor(y / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (feild[x + r][y + c] == num)
                return false;

    return true;
}

function printfeild(feild) {
    var res = "";

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            res += feild[i][j];
        }
        res += "\n";
    }
    console.log(res);
}

solveSudoku(feild,0,0);
console.log(feild);