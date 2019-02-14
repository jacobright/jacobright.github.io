let wallTex;
let buttonTex;
let buttonBaseTex;

let deltaX = 0;
let lastMouseX = 0;
let deltaY = 0;
let lastMouseY = 0;

function setup() {
	createCanvas(screen.width, screen.height, WEBGL);
	background(48);
	wallTex = loadImage('https://i.imgur.com/WZUWoOd.png');
	buttonTex = loadImage('https://i.imgur.com/PNcyZaR.png');
	buttonBaseTex = loadImage('https://i.imgur.com/i59s3ds.png');
}

function draw() {
	background(48);
	
	//Main Cube
	push();
	if (mouseIsPressed){
		deltaX += mouseX*0.01-lastMouseX;
		deltaY -= mouseY*0.01-lastMouseY;
		lastMouseX = mouseX*0.01;
		lastMouseY = mouseY*0.01;
		rotateY(deltaX);
		rotateX(deltaY);
	}
	else
	{
		rotateY(deltaX);
		rotateX(deltaY);
		lastMouseX = mouseX*0.01;
		lastMouseY = mouseY*0.01;
	}
	texture(wallTex);
	scale(2);
	cube = box(100, 100, 100);
	
	// push();
		// texture(buttonTex);
		// translate(56.25, 0, 0);
		// cubeTwo = box(12.5, 25, 25);
		// push();
			// texture(buttonBaseTex);
			// translate(-3*1.5625, 0, 0);
			// box(2*1.5625, 25+2*1.5625, 25+2*1.5625);
		// pop();
	// pop();
	
	pop();
	
}