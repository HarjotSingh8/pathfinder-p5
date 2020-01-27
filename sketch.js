var canvasWidth;
var canvasHeight;
//Inputs
  var colInput;
  var rowInput;
  var wallInput;
  var buttonGenerate;
  var buttonSolve;
//

function setup() {
  canvasWidth = window.outerWidth-10;
  canvasHeight = window.outerHeight-90;
  createCanvas(canvasWidth, canvasHeight);
  //Inputs
  {
    colInput = createInput(100, 'numbers');
    rowInput = createInput(100, 'numbers');
    wallInput = createInput(40, 'numbers');
    startInputi = createInput('0', 'numbers');
    startInputj = createInput('0', 'numbers');
    targetInputi = createInput(colInput.value()-1, 'numbers');
    targetInputj = createInput(colInput.value()-1, 'numbers');
    buttonGenerate = createButton('Generate');
    buttonSolve = createButton('solve');
  }
  //
  //noLoop();
  background(100);
  drawInput();
  gen();
  noLoop();
}



function draw() {
solve();

/*noStroke();
fill(255);
for(var i = 0; i<openSetA.length; i++) {
  ellipse(openSetA[i].eXPos, openSetA[i].eYPos, eHeight, ewidth);
}
fill(255, 0,255);
for(var i = 0; i<openSetB.length; i++) {
  ellipse(openSetB[i].eXPos, openSetB[i].eYPos, eHeight, ewidth);
}*/
drawOutput();

}
