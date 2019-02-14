var canvas;
let lineSpace = 40;


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	background(120);
	rectMode(CENTER);
	
	for (var i = 0; i < 10; i++) {
		print(i);
		fill(random(128, 255), random(128, 255), random(128, 255));
		ellipse(random(0, width), random(0, height), 20, 20);
	}
}

function draw() {
	text("look at all this basic stuff", 80, 40);

	push();
		strokeWeight(1);
		for (var i = 0; i < windowHeight/lineSpace; i++) {
			stroke(0);
			line(0, i*lineSpace, windowWidth, i*lineSpace);
		}
		for (var i = 0; i < windowWidth/lineSpace; i++) {
			stroke(0);
			line(i*lineSpace, windowWidth, i*lineSpace, 0);
		}

	pop();
	
	strokeWeight(2);
	
	fill(200, 20, 20);
	ellipse(width/2, height/2, 200);
	
	fill(20, 20, 200);
	rect(width/2, height/2, 100, 300);
	
	line(10, 10, 80, 80);
	line(10, 80, 80, 10);
	
	strokeWeight(0);
	fill(200, 200, 20);
	
	push();
		//translate(mouseX, mouseY);
		triangle(120, 150, 180, 160, 160, 210);
	pop();
	
	
	push();
		stroke(20, 200, 20);
		fill(20, 200, 20);
		if (mouseIsPressed) {
			strokeWeight(12 + Math.abs(mouseX-pmouseX)/2 + Math.abs(mouseY-pmouseY)/2);
			line(mouseX, mouseY, pmouseX, pmouseY);
			noCursor();
		}
		else
		{
			cursor();
		}
	pop();
	//print(mouseX);
}

function windowResized() {
	canvas = createCanvas(windowWidth, windowHeight);
	background(120);
}