let mouseIsPressed = false;
let mouseSetsWall = false; /*if this is true, then mouse will set wall, else mouse will set path*/
function mousePressed() {
  /*
   * This is an event listener for mouse pressed
   */
  let box = grid.overbox();
  if (box) {
    mouseIsPressed = true;
    box.path = false;
    box.draw();
  }
}
function mouseDragged() {
  /*
   * Event listener for mouse dragged
   */
  if (mouseIsPressed) {
    //do something
  }
}
function mouseReleased() {
  /*
   * Event listener for mouse released
   */
  mouseIsPressed = false;
}
