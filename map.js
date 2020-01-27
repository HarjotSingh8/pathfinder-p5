var xpos;
var ypos;
var mapWidth;
var mapHeight;
function drawMap() {
  xpos = 200;
  ypos = 0;
  mapWidth = canvasWidth-200;
  mapHeight= canvasHeight;
  fill(150);
  rect(xpos, ypos, mapWidth, mapHeight);
}
