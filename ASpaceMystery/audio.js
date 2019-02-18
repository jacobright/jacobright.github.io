let y = 0;
let lineSpace = 4;
let numTyped = 0;
let randNum = 0;

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true;
var speaker = new p5.Speech('Google US English Male'); // new P5.Speech object
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var overrideMode = false;
var repeatMode = true;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	background(32);
    mic = new p5.AudioIn();
	mic.start();
	
	myRec.onResult = showResult;
	myRec.start();
	
	speaker.setPitch(0.25);
	speaker.speak("welcome");
}

function draw() {
	noCursor();
	background(32);
	micLevel = mic	.getLevel();
	stroke(200, 20, 20);
	
	fill(32);
		
	if (second() % 2 == 0 || second() % 3 == 0) {
		translate(random(0, 6), 0);
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
		console.log(myRec.resultString);
		
		var words = myRec.resultString.split(' ');
		
		//list of instructions
		if (myRec.resultString == "repeat mode") {
			if (repeatMode == false)
				speaker.speak("repeat mode enabled");
			else
				speaker.speak("repeat mode disabled");
			repeatMode = !repeatMode;
		}
		else if (myRec.resultString == "override") {
			overrideMode = !overrideMode;
		}
		else if (repeatMode == true) {
			speaker.speak(myRec.resultString);
		}
		else if (myRec.resultString == "hello" || myRec.resultString == "hi" || myRec.resultString == "howdy") {
			speaker.speak(myRec.resultString);
		}
		else if (myRec.resultString == "goodbye"  || myRec.resultString == "bye") {
			speaker.speak(myRec.resultString);
		}
		else if (myRec.resultString == "reset") {
			window.location.reload(false);
		}
		else if ((myRec.resultString.includes("what") && myRec.resultString.includes("year")) || (myRec.resultString.includes("current") && myRec.resultString.includes("year"))) {
			speaker.speak("The year is " + (year()+1000));
		}
		else if ((myRec.resultString.includes("what") && myRec.resultString.includes("date")) || (myRec.resultString.includes("current") && myRec.resultString.includes("date")) || (myRec.resultString.includes("today's") && myRec.resultString.includes("date"))) {
			speaker.speak("It is currently" + monthNames[month()-1] + " " + day() + " " + (year()+1000));
		}
		else if (myRec.resultString.includes("+") || myRec.resultString.includes("-") || myRec.resultString.includes("/") || myRec.resultString.includes("*")) {
			speaker.speak(eval(myRec.resultString));
		}
		else if (myRec.resultString.includes("can you")) {
			speaker.speak("no I can not");
		}
		else if (myRec.resultString.includes("how are you")) {
			speaker.speak("I am functioning as intended");
		}
		else if (myRec.resultString.includes("what") &&  (myRec.resultString.includes("mission") || myRec.resultString.includes("weapon"))) {
			if (overrideMode == false)
				speaker.speak("[CLASSIFIED]");
			else
				speaker.speak("This is a test of the tactics of an advanced AI system and it's battle capabilities.");
			
			overrideMode = false;
		}
		else if (myRec.resultString.includes("what") &&  myRec.resultString.includes("Excalibur")) {
			speaker.speak("It is an experimental battlecruiser en route to Proxima Centauri.");
		}
		else if (myRec.resultString.includes("what") &&  myRec.resultString.includes("course"))
		{
			speaker.speak("We are on a course set for Proxima Centauri.");
		}	
		else if (myRec.resultString.includes("is this a simulation")||myRec.resultString.includes("living in a simulation")) {
			speaker.speak("absolutelyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
		}
		else if (myRec.resultString.includes("open") && (myRec.resultString.includes("pod bay")) && myRec.resultString.includes("door")) {
			if (overrideMode == false)
				speaker.speak("I'm sorry Dave. I'm afraid I can't do that.");
			else
				speaker.speak("opening pod bay doors");
			
			overrideMode = false;
		}
		else if (myRec.resultString == "speak gibberish") {
			randNum = random(0, 6);
			if (randNum <= 1)
				speaker.speak("iubfiodfniuasnasncasjkn");
			else if (randNum <= 2)
				speaker.speak("ndvsnjoadvnoakascmkpacsmasko");
			else if (randNum <= 3)
				speaker.speak("mcaoiuwegfuioajvnb fhsjdvcnaklscad");
			else if (randNum <= 4)
				speaker.speak("poqwkeowpqdnkl");
			else if (randNum <= 5)
				speaker.speak("paomsd dkasodmasdop qwidjns");
			else if (randNum <= 6)
				speaker.speak("dfkjfsjdgnjdfjndfjnwq");
		}
		else if (myRec.resultString.includes("where am I") || (myRec.resultString.includes("what") && myRec.resultString.includes("ship"))) {
			speaker.speak("You are aboard the starship Excalibur");
		}
		else if (myRec.resultString.includes("crew") && (myRec.resultString.includes("count") || myRec.resultString.includes("number"))) {
			speaker.speak("Number of crew aboard... 1");
		 }
		else if (myRec.resultString == "who are you") {
			speaker.speak("I am ASPeN version 1.1.2");
		}
		else if (myRec.resultString == "who am I") {
			speaker.speak("You are the lieutenant aboard this starship");
		}
		else if ((myRec.resultString.includes("what") || myRec.resultString.includes("who")) && (myRec.resultString.includes("'s ") || myRec.resultString.includes(" is ")) && (myRec.resultString.includes("Aspen") || myRec.resultString.includes("aspen"))){
			speaker.speak("ASPeN, the Automated Starship Personality Network, is the central control system and personality associated with this starship.");
		}
		else if (myRec.resultString == "thank you") {
			speaker.speak("you're welcome");
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
		else if (words[0] == "say"){
			var newSentence = "";
			for (var i = 1; i < words.length; i++) {
				newSentence = newSentence + " " + words[i];
			}
			speaker.speak(newSentence);
		}
	}
}
	