//global variable
var canvas;

var mouseSpeedStroke;

var ellipseWH = 200;
//code in setup runs once
function setup() {
canvas = createCanvas(windowWidth, windowHeight); 
background(255, 120, 180);
rectMode(CENTER);

//var i is local to the for loop
for(var i = 0; i < 20; i++){
print(i);
fill(random(0, 255), random(0, 255), random(0,255));
ellipse(random(0, width), random(0,height), 20, 20);
}

}

//runs over and over
//updates every frame
function draw() {
textSize(40);
fill(0);
text('first drawing app', 40, 100);
//background(255, 120, 180);
stroke(0);
strokeWeight(5); 
for(var i = 0; i<windowHeight; i++){
line(0, i*40, windowWidth, i*40 );
}
for(var i = 0; i<windowWidth; i++){
line(i*40, 0, i*40, windowHeight );
}


//line and outline styles
if(mouseX > windowWidth/2){
strokeWeight(10);
stroke(255, 0, 0);
ellipseWH = 400;
fill(120, 44, 110, 50);
}else{
strokeWeight(20);

stroke(255, 0, 255);
ellipseWH = 200;
fill(66, 244, 140, 50);
}

//line requires 4 arguments
//x1, y1, x2, y2
line(20, 60, 700, 500);

mouseSpeedStroke = dist(mouseX, mouseY, pmouseX, mouseY);
strokeWeight(mouseSpeedStroke);
line(mouseX, mouseY, pmouseX, pmouseY);

//ellipse expecting 4 arguments 
ellipse(200, 400, ellipseWH, ellipseWH);

noStroke();
fill(0, 20, 140);
rect(width/2, height/2, 100, 200);


//6 arguments
//x1, y1, x2, y2, x3, y3
//connects the dot to form triangle
triangle(600, 100, 700, 50, 750, 150);

//print(mouseX);
}

function windowResized(){

resizeCanvas(windowWidth, windowHeight);
background(255, 120, 180);
}