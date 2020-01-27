//input Box


function drawInput() {
  var xpos = 0;
  var ypos = 0;
  var inputWidth = 200;
  var inputHeight;
  inputHeight = canvasHeight;
  fill(50);
  rect(xpos, ypos, inputWidth, inputHeight);
  heading = createElement('h2', 'Settings');
  heading.position(10, 5);
  t1 = createElement('text', 'cols');
  t1.position(10,60);
  colInput.position(50,60);
  t1 = createElement('text', 'rows');
  t1.position(10,80);
  rowInput.position(50,80);
  t1 = createElement('text', 'walls');
  t1.position(10,100);
  wallInput.position(50,100);
  t1 = createElement('text', 'Start Location');
  t1.position(10,140);
  startInputi.position(50,160);
  startInputi.style('width', '40px');
  startInputj.position(100,160);
  startInputj.style('width', '40px');
  t1 = createElement('text', 'Target Location');
  t1.position(10,180);
  targetInputi.position(50,200);
  targetInputi.style('width', '40px');
  targetInputj.position(100,200);
  targetInputj.style('width', '40px');


  buttonGenerate.position(50, 225);
  buttonGenerate.mousePressed(regen);
  buttonSolve.position(50, 245);
  buttonSolve.mousePressed(resolve);



  fill(100);
  rect(xpos+canvasHeight/2, ypos, inputWidth, inputHeight/2);
  heading = createElement('h2', 'Distances');
  heading.position(10, canvasHeight/2+5);
  t1 = createElement('text', 'White');
  t1.position(10,canvasHeight/2+60);
  t1 = createElement('text', 'Blue');
  t1.position(10,canvasHeight/2+80);
  //t1 = createElement('text', 'walls');
  //t1.position(10,canvasHeight/2+100);
}

function gen() {
  cols=colInput.value();
  rows=rowInput.value();
  wallPercent=wallInput.value()/100;
  starti=startInputi.value();
  startj=startInputj.value();
  targeti=targetInputi.value();
  targetj=targetInputj.value();

  pointsConstructor();
  drawMap();
  drawPoints();
  initialiseSolve();}

function regen() {
  noLoop();
  boolA = true;
  boolB = true;
  boolC = false;
  completedA=false;
  completedB=false;

  gen();
  solve();
  //initialiseSolve();
  loop();
}
