var openSetC = new Array();
//openSetB.push(grid[0][0]);
var winnerC;//=grid[0][0];
var a;//=grid[0][0];
var b;
var path;
var distC=0;

//
function solveC() {
  if(openSetC.length>0 && !completedC) {
    for(var i = openSetB.length-1; i>=0; i--) {
      if(openSetC[i]==target) {
        completedC=true;
        boolC=false;
      }
      a=openSetC[i];
        if(openSetC[i].hB<=winnerC.hB) {
          for(var j = 0; j<openSetC[i].neighbours.length; j++) {
            b=openSetC[i].neighbours[j];
            if(!b.closedC && !b.wall) {
              calcB(openSetB[i], b);
              checkPushB(b);
            }
          }
          if(openSetC[i].i==targeti && openSetC[i].j==targetj) {
            completedC=true;
            boolC=false;
          }
          openSetC[i].closedC=true;
          removeFromOpenC(i);
        }
    }
  }
  else {

  }
}

function removeFromOpenC(x) {
  //for(var x = openSetB.length-1; x>=0; x--) {
    //if(openSetB[x].i==a.i && openSetB[x].j==a.j) {
      openSetC.splice(x, 1);
    //}
  //}
}

function calcC(a, b) {
  var g=a.gC+Math.sqrt( (a.i-b.i)*(a.i-b.i) + (a.j-b.j)*(a.j-b.j) );
  if(g<b.gC || b.gC==0) {
    b.gC=g;
    b.previousC=a;
  }
  //b.h=Math.sqrt( (b.i-targeti)*(b.i-targeti) + (b.j-targetj)*(b.j-targetj) );
  b.hC = abs(b.i-targeti) + abs(b.j-targetj);
  b.fC=b.gC+b.hC;
}

function checkPushC(a) {
  var x = true;
  for(var i=0; i<openSetC.length; i++) {
    if(openSetC[i].i==a.i && openSetC[i].j==a.j) {
      x=false;
    }
  }
  if(x) {
    openSetC.push(a);
  }

}
function findWinnerC() {
  drawableC=true;
  winnerC=openSetC[0];
    for(var i=0; i<openSetC.length-1; i++) {
      if(openSetC[i].hB<winnerC.hB) {
        winnerC=openSetC[i];
      }
    }
    distC=winnerC.gB;
}

function drawC() {
  //drawMap();
  //drawPoints();
  fill(255,0,0);
  var path = target;
  if(!completedC) {
    findWinnerC();
    var path = winnerC;
  }

  noFill();
  stroke(0,0,255);
  strokeWeight(eScale/2);
  beginShape();
  if(completedC)
  vertex(path.eXPos, path.eYPos);
  while(path!=start) {
    path=path.previousB;
    vertex(path.eXPos, path.eYPos);
  }
  endShape();
  noStroke();
  fill(0,255,0);
  //for(var i = 0; i<openSetB.length; i++) {
  //  ellipse(openSetB[i].eXPos, openSetB[i].eYPos, eHeight, ewidth);
  //}
}
