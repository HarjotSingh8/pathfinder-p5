var rows = 50;
var cols = 50;

var scaleW = (window.outerHeight-100)/cols;
var scaleH = (window.outerHeight-100)/rows;
var start;
var finish;
var wallPercent = 0.3;
var completed=false;

var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var winner;
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
  //console.log(grid[0][0].neighbours.length);
  var start = grid[0][0];
  var finish = grid[cols-1][rows-1];
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
  b.h=Math.sqrt( (b.i-cols-1)*(b.i-cols-1) + (b.j-rows-1)*(b.j-rows-1) );
  //b.h=cols-1-b.i+rows-1-b.j;
  b.f=b.g+b.h;
  console.log("calc");
  console.log(b.i+" "+b.j);
  //console.log(b.f);
  //console.log(winner.f);
  //console.log(b.g);
  //console.log(winner.g);
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

function findWinner() {
  winner=openSet[0];
  for(var i=0; i<openSet.length-1; i++) {
    if(openSet[i].f<winner.f) {
      winner=openSet[i];
    }
  }
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
  console.log("ran");
  if(openSet.length>0 && !completed) {
    for(var i = openSet.length-1; i>=0; i--) {
      findWinner();
      a=openSet[i];
      console.log(openSet[i].i+" "+openSet[i].j);
      console.log(winner.f);
        if(a.f<=winner.f) {
          for(var j = 0; j<a.neighbours.length; j++) {
            b=a.neighbours[j];
            //console.log(b.closed);
            if(!b.closed && !b.wall) {
              calc(a, b);
              checkPush(grid[b.i][b.j]);
            }
          }
          if(a.i==cols-1 && a.j==rows-1) {
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
    var path = grid[cols-1][rows-1];
    vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
    do {
      path=path.previous;
      vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
      //ellipse(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2, scaleH/2, scaleH/2);
    }while(path!=grid[0][0]);
    endShape()
    noLoop();
    return;
  }
  noFill();
  stroke(255);
  strokeWeight(scaleW/2);
  beginShape();
  var path = winner;
  vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
  do {
    path=path.previous;
    vertex(path.i*scaleW + scaleW/2, path.j*scaleH + scaleH/2);
  }while(path!=grid[0][0]);
  endShape();
}
