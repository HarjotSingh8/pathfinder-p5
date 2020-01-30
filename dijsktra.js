let solved = false;
let solvingDijsktra = false;
let showpath = false; //false
let unvisited = [];
let currentonPathAnimation;
let prevdist = 0;
let visualise = false;
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
      neighbors[x].visitedFromSource = true;
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
    grid.grid[row + 1][col].visitedFromSource == false
  )
    neighbors.push(grid.grid[row + 1][col]);
  if (
    col + 1 < cols &&
    grid.grid[row][col + 1].path &&
    grid.grid[row][col + 1].visitedFromSource == false
  )
    neighbors.push(grid.grid[row][col + 1]);
  if (
    row - 1 >= 0 &&
    grid.grid[row - 1][col].path &&
    grid.grid[row - 1][col].visitedFromSource == false
  )
    neighbors.push(grid.grid[row - 1][col]);
  if (
    col - 1 >= 0 &&
    grid.grid[row][col - 1].path &&
    grid.grid[row][col - 1].visitedFromSource == false
  )
    neighbors.push(grid.grid[row][col - 1]);
  return neighbors;
}
function startpath() {
  if (showpath && showpath != destination) {
    clearpath();
  }
  if (showpath == false) {
    currentonPathAnimation = destination.prev;
    showpath = destination;
    visualise = true;
    return;
  }
  if (destination.path) {
    currentonPathAnimation = destination.prev;
    while (currentonPathAnimation != source) {
      currentonPathAnimation.drawroute();
      currentonPathAnimation = currentonPathAnimation.prev;
    }
    showpath = destination;
  }
}
function visualisePath() {
  if (currentonPathAnimation == source) {
    console.log("stopped");
    visualise = false;
    return;
  }
  currentonPathAnimation.drawroute();
  currentonPathAnimation = currentonPathAnimation.prev;
}

function clearpath() {
  current = showpath.prev;
  while (current != source) {
    current.drawpath();
    current = current.prev;
  }
  showpath = destination;
}
