var rows = 100;
var cols = 100;

var scaleW = (window.outerHeight-100)/cols;
var scaleH = (window.outerHeight-100)/rows;
var start;
var starti=0;
var startj=0;
var finish;
var finishi=99;
var finishj=99;
var wallPercent = 0.4;
var completed=false;

var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var winner;
var shortH;
var path;

function p(i, j) {
  this.i=i;
  this.j=j;
  this.f=0;
  this.h=0;
  this.g=0;
  this.neighbours = new Array();
  this.previous=undefined;
  this.closed=false;

  this.wall=false;
  if(random(1)<wallPercent) {
    this.wall=true;
  }



}
function addNeighbor(i, j) {
  if(i>0) {
    grid[i][j].neighbours.push(grid[i-1][j]);
      if(j>0) {
        grid[i][j].neighbours.push(grid[i-1][j-1]);
      }
      if(j<rows-1) {
        grid[i][j].neighbours.push(grid[i-1][j+1]);
      }
  }
  if(i<cols-1) {
    grid[i][j].neighbours.push(grid[i+1][j]);
      if(j>0) {
        grid[i][j].neighbours.push(grid[i+1][j-1]);
      }
      if(j<rows-1) {
        grid[i][j].neighbours.push(grid[i+1][j+1]);
      }
  }
  if(j>0) {
    grid[i][j].neighbours.push(grid[i][j-1]);
  }
  if(j<rows-1) {
    grid[i][j].neighbours.push(grid[i][j+1]);
  }

}




function setup() {
  createCanvas(window.outerHeight-100, window.outerHeight-100);
  for(var i = 0; i<cols; i++) {
    grid[i] = new Array(rows);
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new p(i, j);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      addNeighbor(i, j);
    }
  }
  var start = grid[starti][startj];
  var finish = grid[finishi][finishj];
  start.wall=false;
  finish.wall=false;
  openSet.push(start);
  winner=start;
  calc(start,start);
}

function calc(a, b) {
  var g=a.g+Math.sqrt( (a.i-b.i)*(a.i-b.i) + (a.j-b.j)*(a.j-b.j) );
  if(g<b.g || b.g==0) {
    b.g=g;
    //b.g=b.g+b.i-a.i+b.j-a.j;
    b.previous=a;
  }
  b.h=Math.sqrt( (b.i-finishi)*(b.i-finishi) + (b.j-finishj)*(b.j-finishj) );
  //b.h=cols-1-b.i+rows-1-b.j;
  b.f=b.g+b.h;
  if(b.f<=winner.f) {
    winner = b;
  }
}

function removeFromOpen(a, b) {
  for(var x = openSet.length-1; x>=0; x--) {
    if(openSet[x].i===a && openSet[x].j===b) {
      openSet.splice(x, 1);
    }
  }
}

function findH() {
  shortH=openSet[0];
  for(var i=0; i<openSet.length-1; i++) {
    if(openSet[i].h<shortH.h) {
      shortH=openSet[i];
    }
  }
}

function findWinner() {
  winner=openSet[0];
  /*for(var i=0; i<openSet.length-1; i++) {
    if(openSet[i].f<winner.f && openSet.h<openSet+cols*0.15) {
      winner=openSet[i];
    }
  }
  if(winner==openSet[0]) {*/
    for(var i=0; i<openSet.length-1; i++) {
      if(openSet[i].f<winner.f) {
        winner=openSet[i];
      }
    }
  //}
}

function checkPush(a) {
  var x = true;
  for(var i=0; i<openSet.length; i++) {
    if(openSet[i]==a) {
      x=false;
    }
  }
  if(x) {
    openSet.push(a);
  }
}

function draw() {
  background(100);
  if(openSet.length>0 && !completed) {
    for(var i = openSet.length-1; i>=0; i--) {
      findWinner();
      a=openSet[i];
        if(a.f<=winner.f) {
          for(var j = 0; j<a.neighbours.length; j++) {
            b=a.neighbours[j];
            //console.log(b.closed);
            if(!b.closed && !b.wall) {
              calc(a, b);
              checkPush(grid[b.i][b.j]);
            }
          }
          if(a.i==finishi && a.j==finishj) {
            completed=true;
          }
          a.closed=true;
          removeFromOpen(a.i, a.j);
        }
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if(grid[i][j].wall) {
        fill(0);
      }
      else if(grid[i][j].closed) {
        fill(255, 0, 0);
      }
      else {
        fill(100);
      }
      noStroke();
      ellipse(i*scaleW + scaleW/2, j*scaleH + scaleH/2, scaleH/2, scaleH/2);
    }
  }
  for(var i = 0; i<openSet.length; i++) {
    a=openSet[i];
    fill(0,255,0);
    ellipse(a.i*scaleW + scaleW/2, a.j*scaleH + scaleH/2, scaleH/2, scaleH/2);
  }

  if(completed) {
    noFill();
    stroke(255);
    strokeWeight(scaleW/2);
    beginShape();
    var path = grid[finishi][finishj];
    vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
    do {
      path=path.previous;
      vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
      //ellipse(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2, scaleH/2, scaleH/2);
    }while(path!=grid[starti][startj]);
    endShape();

    strokeWeight(scaleW/4);
    fill(255, 0 ,255);
    ellipse(starti*scaleW + scaleW/2, startj*scaleH + scaleH/2, scaleH, scaleH);
    ellipse(finishi*scaleW + scaleW/2, finishj*scaleH + scaleH/2, scaleH, scaleH);
    noLoop();
    return;
  }
  findWinner();
  noFill();
  stroke(255);
  strokeWeight(scaleW/2);
  beginShape();
  var path = winner;
  vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
  do {
    path=path.previous;
    vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
  }while(path!=grid[starti][startj]);
  endShape();
  strokeWeight(scaleW/4)
  fill(255, 0 ,255);
  ellipse(starti*scaleW + scaleW/2, startj*scaleH + scaleH/2, scaleH, scaleH);
  ellipse(finishi*scaleW + scaleW/2, finishj*scaleH + scaleH/2, scaleH, scaleH);

}
