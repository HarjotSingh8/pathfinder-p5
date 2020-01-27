class Grid {
  /*
   * This class contains grid data
   */
  constructor(rows, cols) {
    this.grid = [];
    for (let i = 0; i < rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = new Node(i, j);
      }
    }
  }
  overbox() {
    /*
     * this function checks if the mouse was present over a box when it was pressed
     * mouseX returns x co-ordinate of mouse
     * mouseY returns y co-ordinate of mouse
     * mouse co-ordinates are computed to get the box in which the mouse currently exists in
     */
    console.log(
      floor((mouseX / windowWidth) * cols) +
        "," +
        floor((mouseY / windowHeight) * rows)
    );
    return this.grid[floor((mouseX / windowWidth) * cols)][
      floor((mouseY / windowHeight) * rows)
    ];
    return false;
  }
  draw() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.grid[i][j].draw();
        console.log("drawing");
      }
    }
  }
}

class Node {
  /*
   * This class is used for boxes in the grid
   */
  constructor(i, j) {
    this.xpos = (windowWidth / cols) * j;
    this.ypos = (windowHeight / rows) * i;
    this.path = true;
    if (i == 0) this.path = false;
  }
  draw() {
    if (this.path) fill(255, 255, 255);
    else fill(50, 50, 50);
    rect(this.xpos, this.ypos, 20, 20);
  }
}
