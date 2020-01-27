var boolA = true;
var boolB = true;
var boolC = false;
var completedA=false;
var completedB=false;
var drawableA = false;

function initialiseSolve() {
  openSetA=new Array();
  openSetA.push(start);
  winnerA=start
  a=start
  calcA(start, start);
  openSetB=new Array();
  openSetB.push(start);
  winnerB=start
  a=start
  calcB(start, start);
}
function solve() {

  //for(var i=0; i<100; i++) {
  //while(boolA || boolB || boolC) {
    if(boolA) {
      findWinnerA();
      solveA();
      //findWinnerA();
    }
    else {
      distA=target.gA;
    }
    //drawA();
    if(boolB) {
      findWinnerB();
      solveB();
      //findWinnerB();
    }
    else {
      distB=target.gB;
    }
    //drawB();
    if(boolC) {

    }
  //}
  if(!boolA) {
    drawA();
  }
  if(!boolB) {
    drawB();
  }
}

function resolve() {
  noLoop();
  //resettig closed values
  for(var i = 0; i<cols; i++) {
    for(var j = 0; j<rows; j++) {
      grid[i][j].closedA=false;
    }
  }
  //clearing openSet
  openSetA=new Array();
  winner=start;
  initialiseSolve();
}
