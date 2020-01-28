let solved = false;
let solvingDijsktra = false;
let showpath = false;
let unvisited = [];
let currentonPath;
let prevdist = 0;
function startDijsktra() {
  if (solvingDijsktra) {
    console.log("already solving");
    return;
  } else if (solved) clearState();
  else {
    //solve using dijsktra here
    console.log("solving dijsktra");
    solvingDijsktra = true;
    unvisited = [source];
    source.distance = 0;
  }
}

function solveDijsktra() {
  console.log("solving");
  if (unvisited.length == 0) {
    solvingDijsktra = false;
    solved = true;
    startpath();
    return;
  }
  while (unvisited.length > 0 && unvisited[0].distance == prevdist) {
    //console.log(unvisited);
    let neighbors = getUnvisitedNeighbors(unvisited[0].x, unvisited[0].y);
    //console.log(neighbors);
    for (let x = 0; x < neighbors.length; x++) {
      unvisited.push(neighbors[x]);
      neighbors[x].distance = unvisited[0].distance + 1;
      neighbors[x].prev = unvisited[0];
      neighbors[x].visited = true;
    }
    unvisited[0].draw();
    unvisited.shift();
  }
  if (unvisited.length > 0) prevdist = unvisited[0].distance;
}
function getUnvisitedNeighbors(col, row) {
  let neighbors = [];
  if (
    row + 1 < rows &&
    grid.grid[row + 1][col].path &&
    grid.grid[row + 1][col].visited == false
  )
    neighbors.push(grid.grid[row + 1][col]);
  if (
    col + 1 < cols &&
    grid.grid[row][col + 1].path &&
    grid.grid[row][col + 1].visited == false
  )
    neighbors.push(grid.grid[row][col + 1]);
  if (
    row - 1 >= 0 &&
    grid.grid[row - 1][col].path &&
    grid.grid[row - 1][col].visited == false
  )
    neighbors.push(grid.grid[row - 1][col]);
  if (
    col - 1 >= 0 &&
    grid.grid[row][col - 1].path &&
    grid.grid[row][col - 1].visited == false
  )
    neighbors.push(grid.grid[row][col - 1]);
  return neighbors;
}
function startpath() {
  if (showpath && showpath != destination) {
    clearpath();
  }
  if (destination.path) {
    current = destination.prev;
    while (current != source) {
      current.drawroute();
      current = current.prev;
    }
    showpath = destination;
  }
}

function clearpath() {
  current = showpath.prev;
  while (current != source) {
    current.drawpath();
    current = current.prev;
  }
  showpath = destination;
}
