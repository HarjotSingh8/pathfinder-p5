var openSetB = new Array();
//openSetB.push(grid[0][0]);
var winnerB;//=grid[0][0];
var a;//=grid[0][0];
var b;
var path;
var distB=0;

//
function solveB() {
  if(openSetB.length>0 && !completedB) {
    for(var i = openSetB.length-1; i>=0; i--) {
      if(openSetB[i]==target) {
        completedB=true;
        boolB=false;
      }
      a=openSetB[i];
        if(openSetB[i].hB<=winnerB.hB) {
          for(var j = 0; j<openSetB[i].neighbours.length; j++) {
            b=openSetB[i].neighbours[j];
            if(!b.closedB && !b.wall) {
              calcB(openSetB[i], b);
              checkPushB(b);
            }
          }
          if(openSetB[i].i==targeti && openSetB[i].j==targetj) {
            completedB=true;
            boolB=false;
          }
          openSetB[i].closedB=true;
          removeFromOpenB(i);
        }
    }
  }
  else {

  }
}

function removeFromOpenB(x) {
  //for(var x = openSetB.length-1; x>=0; x--) {
    //if(openSetB[x].i==a.i && openSetB[x].j==a.j) {
      openSetB.splice(x, 1);
    //}
  //}
}

function calcB(a, b) {
  var g=a.gB+Math.sqrt( (a.i-b.i)*(a.i-b.i) + (a.j-b.j)*(a.j-b.j) );
  if(g<b.gB || b.gB==0) {
    b.gB=g;
    b.previousB=a;
  }
  //b.h=Math.sqrt( (b.i-targeti)*(b.i-targeti) + (b.j-targetj)*(b.j-targetj) );
  b.hB = abs(b.i-targeti) + abs(b.j-targetj);
  b.fB=b.gB+b.hB;
}

function checkPushB(a) {
  var x = true;
  for(var i=0; i<openSetB.length; i++) {
    if(openSetB[i].i==a.i && openSetB[i].j==a.j) {
      x=false;
    }
  }
  if(x) {
    openSetB.push(a);
  }

}
function findWinnerB() {
  drawableB=true;
  winnerB=openSetB[0];
    for(var i=0; i<openSetB.length-1; i++) {
      if(openSetB[i].hB<winnerB.hB) {
        winnerB=openSetB[i];
      }
    }
    distB=winnerA.gB;
}

function drawB() {
  //drawMap();
  //drawPoints();
  /*fill(255,0,0);
  var path = target;
  if(!completedB) {*/
    //findWinnerB();
    var path = target;
  //}

  noFill();
  stroke(0,0,255);
  strokeWeight(eScale/2);
  beginShape();
  //if(completedB)
  vertex(path.eXPos, path.eYPos);
  while(path!=start) {
    path=path.previousB;
    vertex(path.eXPos, path.eYPos);
  }
  endShape();
  noStroke();
  //fill(0,255,0);
  //for(var i = 0; i<openSetB.length; i++) {
  //  ellipse(openSetB[i].eXPos, openSetB[i].eYPos, eHeight, ewidth);
  //}
}
