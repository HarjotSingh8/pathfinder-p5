var rows;
var cols;
var scaleX;
var scaleY;
var wallPercent;
var grid = new Array();
var start;
var starti;
var startj;
var target;
var targeti;
var targetj;
var eScale;
var ewidth;
var eHeight;
var stdColr=150;

function points(a, b) {
  this.i=a;
  this.j=b;
  this.fA=0;
  this.hA=0;
  this.gA=0;
  this.fB=0;
  this.hB=0;
  this.gB=0;
  this.neighbours = new Array();
  this.previousA = undefined;
  this.closedA = false;
  this.previousB = undefined;
  this.closedB = false;
  this.wall = false;
  this.colR=stdColr;
  this.colG=stdColr;
  this.colB=stdColr;
  if(random(1)<wallPercent) {
    this.wall=true;
    this.colR=0;
    this.colG=0;
    this.colB=0;
  }
  fill(200);
  this.eXPos=200+this.i*scaleX + scaleX/2;
  this.eYPos=this.j*scaleY + scaleY/2;


}

function pointsConstructor() {
  //noLoop();
  //targeti = 50;
  //targetj = 50;
  scaleX = mapWidth/cols;
  scaleY = mapHeight/rows;
  if(scaleY>scaleX) {
    eScale=scaleX;
    scaleY=scaleX;
  }
  else {
    eScale=scaleY;
    scaleX=scaleY;
  }
  eHeight=eScale/2;
  ewidth=eScale/2;
  for(var i = 0; i<cols; i++) {
    grid[i]=new Array(rows);
  }

  for(var i = 0; i<cols; i++) {
    for(var j = 0; j<rows; j++) {
      grid[i][j]=new points(i, j);
    }
  }

  for(var i = 0; i<cols; i++) {
    for(var j = 0; j<rows; j++) {
      addNeighbor(i, j);
    }
  }

  start = grid[starti][startj];
  target = grid[targeti][targetj];
  start.wall=false;
  start.colR=255;
  start.colG=255;
  start.colB=255;
  target.wall=false;
  target.colR=255;
  target.colG=255;
  target.colB=255;
  calcA(start, start);
  calcB(start, start);
}

function drawPoints() {
  for(var i = 0; i<cols; i++) {
    for(var j = 0; j<rows; j++) {
      noStroke();
      //
        if(grid[i][j].closedA) {
          grid[i][j].colR=255;
        }
        if(grid[i][j].closedB) {
          grid[i][j].colB=255;
        }
      //
      //if(!grid[i][j].closedA || !grid[i][j].closedB)
      fill(grid[i][j].colR,grid[i][j].colG,grid[i][j].colB);
      //else {
      //  fill(255,0,0);
      //}
      ellipse(grid[i][j].eXPos, grid[i][j].eYPos, eHeight, ewidth);
    }
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
