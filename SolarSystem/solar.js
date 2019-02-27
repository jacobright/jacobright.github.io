let spriteSun;
let spriteMercury;
let spriteVenus;
let spriteEarth;
let spriteMars;
let spriteJupiter;
let spriteSaturn;
let spriteUranus;
let spriteNeptune;
let spritePluto;

var planets;
var scaleFactor = 1;
var lastMouseX;
var lastMouseY;
var deltaX;
var deltaY;

var timeScale = 1;
var prevTimeScale;
var viewOrbits = false;
var spinPlanets = false;
var orbitWidth = 1.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(12);

  //initialize the textures for all of the planets
  spriteSun = loadImage('https://i.imgur.com/cFgoX2k.png');
  spriteMercury = loadImage('https://i.imgur.com/UcqKhUh.png');
  spriteVenus = loadImage('https://i.imgur.com/38g2zev.png');
  spriteEarth = loadImage('https://i.imgur.com/FO0ct5n.png');
  spriteMars = loadImage('https://i.imgur.com/qs5t92g.png');
  spriteJupiter = loadImage('https://i.imgur.com/vemnsb2.png');
  spriteSaturn = loadImage('https://i.imgur.com/bekbXEE.png');
  spriteUranus = loadImage('https://i.imgur.com/K7yYZKw.png');
  spriteNeptune = loadImage('https://i.imgur.com/pAHtbyW.png');
  spritePluto = loadImage('https://i.imgur.com/2ITlpRz.png');

  //center the planet sprites
  imageMode(CENTER);
  
  //the array of planet objects
  planets = [
	sun = {radius:0, sprite:spriteSun, angle:0, orbitLength:1},
  	mercury = {radius:250, sprite:spriteMercury, angle:random(0, 2*Math.PI), orbitLength:64},
  	venus = {radius:350, sprite:spriteVenus, angle:random(0, 2*Math.PI), orbitLength:128},
	earth = {radius:500, sprite:spriteEarth, angle:random(0, 2*Math.PI), orbitLength:196},
	mars = {radius:620, sprite:spriteMars, angle:random(0, 2*Math.PI), orbitLength:350},
	jupiter = {radius:820, sprite:spriteJupiter, angle:random(0, 2*Math.PI), orbitLength:1024},
	saturn = {radius:1100, sprite:spriteSaturn, angle:random(0, 2*Math.PI), orbitLength:2048},
	uranus = {radius:1250, sprite:spriteUranus, angle:random(0, 2*Math.PI), orbitLength:3072},
	neptune = {radius:1400, sprite:spriteNeptune, angle:random(0, 2*Math.PI), orbitLength:4096},
	pluto = {radius:1480, sprite:spritePluto, angle:random(0, 2*Math.PI), orbitLength:5012}
  ];
  
  //used to easily drag the system around, relative to wherever the mouse is clicked
  lastMouseX = windowWidth/2;
  lastMouseY = windowHeight/2;
  deltaX = lastMouseX;
  deltaY = lastMouseY;
}

function draw() {
	if (!viewOrbits)
		background(12);
	
	//move each planet
	for (var i = 0; i < planets.length; i++) {
		push();
			movePlanet(planets[i]);
		pop();
	}
	
	//used to easily drag the system around, relative to wherever the mouse is clicked
	if (mouseIsPressed) {
		viewOrbits = false;
		deltaX = deltaX + mouseX-lastMouseX;
		deltaY = deltaY + mouseY-lastMouseY;
		lastMouseX = mouseX;
		lastMouseY = mouseY;
	}
	else
	{
		lastMouseX = mouseX;
		lastMouseY = mouseY;
	}
	
	//draw the instructions
	push();
		textAlign(CORNER);
		fill(255);
		text("\n[S]\t\tSpin Planets\n[O]\t\tView Orbits\n[P]\t\tPause\n[-/+]\tZoom\n[</>] Timescale", 0, 0);
	pop();
	

}

function windowResized() {
	createCanvas(windowWidth, windowHeight);
	background(12);
}

function movePlanet(planet) {
	//move the planet according to the unit circle, basically
	planet.angle -= timeScale * Math.PI/(planet.orbitLength);
	translate(deltaX + (scaleFactor * orbitWidth * planet.radius * Math.sin(planet.angle)), deltaY + (scaleFactor * planet.radius * Math.cos(planet.angle)));
	if (spinPlanets)
		rotate(-planet.angle*10);
	image(planet.sprite, 0, 0, scaleFactor * planet.sprite.width/2, scaleFactor * planet.sprite.height/2);
}

function keyTyped() {
	//used to "zoom" in and out of the system
	if(scaleFactor > .25 && key === "-"){
		viewOrbits = false;
		scaleFactor -= 0.25;
	}
	else if(scaleFactor < 8	 && (key === "=" ||  key === "+")){
		viewOrbits = false;
		scaleFactor += 0.25;
	}
	//used to pause/freeze time
	else if(key === "p"){
		if (timeScale == 0)
			timeScale = prevTimeScale;
		else {
			prevTimeScale = timeScale;
			timeScale = 0;
		}
	}
	//used to modify the time scale (how fast the orbits are)
	else if(key === "." || key === ">"){
		timeScale += 0.25;
	}
	else if(key === "," || key === "<"){
		timeScale -= 0.25;
	}
	//view the orbits as they happen
	else if(key === "o"){
		viewOrbits = !viewOrbits;
	}
	//spin the planets
	else if (key === "s") {
		spinPlanets = !spinPlanets;
	}

}