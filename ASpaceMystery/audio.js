let y = 0;
let lineSpace = 4;
let numTyped = 0;
let randNum = 0;

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true;
var speaker = new p5.Speech('Google UK English Male'); // new P5.Speech object

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	background(32);
    mic = new p5.AudioIn();
	mic.start();
	
	myRec.onResult = showResult;
	myRec.start();
}

function draw() {
	noCursor();
	background(32);
	micLevel = mic	.getLevel();
	stroke(200, 20, 20);
	
	fill(32);
		
	if (second() % 2 == 0 || second() % 3 == 0) {
		translate(random(0, 4), 0);
	}
	
	//exterior circle
	strokeWeight(4 + (100 * micLevel));
	ellipse(width/2, height/2, 200 + (1900 * micLevel));
	
	//interior circle
	strokeWeight(6);
	ellipse(width/2, height/2, 180 + (1800 * micLevel));
	
	push();
		strokeWeight(1);
		for (var i = 0; i < windowHeight/lineSpace; i++) {
			stroke(52);
			line(0, y+i*lineSpace, windowWidth, y+i*lineSpace);
		}
		y += 0.75;
		
		if (y % lineSpace == 0) {
			y = 0;
		}
	pop();
}

function windowResized() {
	canvas = createCanvas(windowWidth, windowHeight);
	background(32);
}

function showResult()
{
	if(myRec.resultValue==true) {
		background(192, 255, 192);
		text(myRec.resultString, width/2, height/2);
		console.log(myRec.resultString);
		
		//list of specific instructions
		if (myRec.resultString.includes("+") || myRec.resultString.includes("-") || myRec.resultString.includes("/") || myRec.resultString.includes("*")) {
			speaker.speak(eval(myRec.resultString));
		}
		else if (myRec.resultString.includes("can you")) {
			speaker.speak("no I can not");
		}
		else if (myRec.resultString.includes("is this a simulation")||myRec.resultString.includes("living in a simulation")) {
			speaker.speak("absolutelyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
		}
		else if (myRec.resultString.includes("Hal") && myRec.resultString.includes("open") && myRec.resultString.includes("door")) {
			speaker.speak("I'm sorry Dave. I'm afraid I can't do that.");
		}
		else if (myRec.resultString == "speak gibberish") {
			randNum = random(0, 4);
			print(randNum);
			if (randNum <= 1)
				speaker.speak("iubfiodfniuasnasncasjkn");
			else if (randNum <= 2)
				speaker.speak("ndvsnjoadvnoakascmkpacsmasko");
			else if (randNum <= 3)
				speaker.speak("mcaoiuwegfuioajvnb fhsjdvcnaklscad");
			else if (randNum <= 4)
				speaker.speak("poqwkeowpqdnkl");
		}
		else if (myRec.resultString == "are you a robot") {
			speaker.speak("yes");
		}
		else if (myRec.resultString == "are you John Stark") {
			speaker.speak("no");
		}
		else if (myRec.resultString == "no") {
			speaker.speak("yes");
		}
		else if (myRec.resultString == "yes") {
			speaker.speak("no");
		}
		else if (myRec.resultString == "stop") {
			speaker.speak("no");
		}
		else if (myRec.resultString == "why not" || myRec.resultString == "why" ) {
			speaker.speak("because");
		}
		else{
			speaker.speak(myRec.resultString);
		}
	}
}
