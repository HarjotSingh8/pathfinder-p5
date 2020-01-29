let rows;
let cols;
let walls;
let grid;
let source = null;
let destination = null;

let gridSize = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  rows = floor(windowHeight / gridSize);
  cols = floor(windowWidth / gridSize);
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
  //if (solved) noLoop();
  if (visualise) visualisePath();
  console.log("running");
}
