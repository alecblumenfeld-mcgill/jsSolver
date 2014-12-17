
var size = 3;
var n = 9;
var Sudoku ={
	 field : [
        [0,0,8,4,0,3,5,0,6],
        [0,0,3,1,0,2,0,0,4],
        [0,4,5,7,0,0,0,9,0],
        [6,9,0,0,0,5,0,0,7],
        [0,8,0,0,0,0,0,5,0],
        [4,0,0,3,0,0,0,1,8],
        [0,7,0,0,0,6,2,4,0],
        [1,0,0,5,0,7,8,0,0],
        [8,0,6,9,0,1,3,0,0]
    ]

	 //new Array()
};

// for (var i = 0; i < n; i++) {
//   Sudoku.field.push([0,0,0,0,0,0,0,0,0]);
// }
// 
// Sudoku.field[0][6] =7;

// Sudoku.field[1][3] =4;
// Sudoku.field[1][4] =1;
// Sudoku.field[1][5] =7;


// Sudoku.field[2][1] =9;
// Sudoku.field[2][3] =8;
// Sudoku.field[2][5] =2;
// Sudoku.field[2][7] =6;


// Sudoku.field[3][0] =7;
// Sudoku.field[3][1] =2;
// Sudoku.field[3][4] =4;
// Sudoku.field[3][7] =3;
// Sudoku.field[3][8] =6;

clean();

console.log(Sudoku.field);

function clean () {
	var x = 0;
	var y = 0;
	while(Sudoku.field[(x)][(y)] != 0){
		y++;
		if(y==n){
			y=0;
			x++;
		}
	}
	solve(x,y);
}


function solve (x,y) {
	for(var p = 1 ; p<(n+1); p = p +1){
		console.log(Sudoku.field);

		if (p==9 && check(p,x,y)>0) {
		};
		if(check(p,x,y)>0){
			

			Sudoku.field[(x)][(y)] = p;
			//console.log(Sudoku.field);

			var xnext = x;
			var ynext =y;
						//console.log(p,x,y);

			while(Sudoku.field[xnext][ynext] !=0){

				ynext++;
				if (ynext ==n-1){
					ynext=0;
					xnext++;
					if (Sudoku.field[xnext][ynext] == 0) {
						solve(xnext, ynext);
					};
					if (xnext == n-1) {
						return true;	
					};
				};
			
			};
			
			if (xnext==x && ynext == y) {
				return false;

			};
			if (solve(xnext, ynext)) {
				 return true;
			};
			
		};
	};
	Sudoku.field[(x)][(y)]=0;
	return false;
	
}
function check (number,x,y) {
	var xblock = Math.floor(x/size)*size;
	var yblock = Math.floor(x/size)*size;
	for (var i = xblock; i <xblock+size ; i++) {
		for (var j = yblock; j <yblock+size ; j++) {
			if (number == Sudoku.field[i][j]) {
				
				return 0;
			};
		};
	};
	for (var j = 0; j  < n; j++) {
		if (number == Sudoku.field[x][j]) {
			console.log("flag2");

			return 0;
		};
	};
	for (var i = 0; i  < n; i++) {
		if (number == Sudoku.field[i][y]) {
			console.log("flag3");

			return 0;
		};
	};
	return 1;
}	






