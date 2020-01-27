let rows;
let cols;
let walls;
let grid;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  rows = windowHeight / 20;
  cols = windowWidth / 20;
  grid = new Grid(rows, cols);
  noLoop();
}

function draw() {
  //background(50);
  grid.draw();
}
