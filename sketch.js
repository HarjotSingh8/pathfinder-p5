let rows;
let cols;
let walls;
let grid;
let source = null;
let destination = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  rows = floor(windowHeight / 20);
  cols = floor(windowWidth / 20);
  grid = new Grid(rows, cols);
  pathcolor = color(150, 150, 150);
  wallcolor = color(0, 0, 0);
  routecolor = color(0, 200, 0);
  sourcecolor = color(200, 0, 0);
  destinationcolor = color(0, 0, 200);
  visitedcolor = color(255, 255, 255);
  grid.draw();
}

function draw() {
  //background(50);

  if (solvingDijsktra) solveDijsktra();
  if (solved) noLoop();
}
