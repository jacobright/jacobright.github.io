var canvas;
var questionBox;
var speaker = new p5.Speech('Google US English Male');
speaker.onStart = startSpeaking;
speaker.onEnd = stopSpeaking;
//speaker.interrupt = true;

var distMin = 0;
var distSec = 0;
var toMin = 0;
var toSec = 0;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var currCircleSize = 0.01;
var qLength = 0;
var isSpeaking;
var opRangeLie = "I am functioning at 88% my normal operating range";
var overrideMode = false;
var textVis = "";
var timer = "";
var timeSinceStageLoaded = 0;

var stage0 = false;
var stage1 = false;
var stage2 = false;
var stage3 = false;
var stage4 = false;
var stage5 = false;
var runStage = false;

let y = 0;
let lineSpace = 4;
const setup = () => {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	
	speaker.setPitch(0.2);
	speaker.setRate(0.9);
	//sayAndPrintMsg("Ask me a question");

	stage0 = true;
	runStage = true;
}

const draw = () => {
	if (stage0 == true && runStage == true) {
		stage_0();
	}
	else if (stage1 == true) {
		if (runStage == true)
			stage_1();
		stage_1_continuous();
		questionBox.changed(questionChecker);
	}
	else if (stage2 == true) {
		if (runStage == true)
			stage_2();
		stage_2_continuous();
		questionBox.changed(questionChecker);
	}
	else if (stage3 == true) {
		if (runStage == true)
			stage_3();
		stage_3_continuous();
		questionBox.changed(questionChecker);
	}
	else if (stage4 == true) {
		if (runStage == true)
			stage_4();
		stage_4_continuous();
		questionBox.changed(questionChecker);
	}
	else if (stage5 == true) {
		if (runStage == true)
			stage_5();
		stage_5_continuous();
		questionBox.changed(questionChecker);
	}
	
	runStage = false;
}

const stage_0 = () => {
	//this function is to display the initial screen, to introduce you to the scene
	background(48);
	textVis = createElement("textVis", "You wake up in a strange hallway, doors sealed at each end.<br>You notice a terminal on the wall near you.<br><br>");
	timer = createElement("h1", "");
	enterTerminal = createA("#", "[OPEN TERMINAL]<br>");
	enterTerminal.mousePressed(start);
}

const start = () => {
	enterTerminal.hide();
	sayAndPrintMsg("Ask a question");
	stage1 = true;
	runStage = true;
	stage0 = false;
}

const stage_1 = () => {
	//questionBox = createElement('input');
	questionBox = createInput('');
}

//the necessary features for stage 1 that run continuously (basically just the circle)
const stage_1_continuous = () => {	
	background(48);
	stroke(255, 16, 16);
	fill(48);
	
	if (isSpeaking == true)
		currCircleSize = currCircleSize += random(-0.008, 0.008);
			
	if (currCircleSize < 0.001 || currCircleSize > 0.03)
		currCircleSize = 0.01;
		
	//exterior circle
	strokeWeight(4 + (100 * currCircleSize));
	ellipse(width/2, height/2, 200 + (1900 * currCircleSize));
	
	//interior circle
	strokeWeight(6);
	ellipse(width/2, height/2, 180 + (1800 * currCircleSize));
	
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

const stage_2 = () => {
	//questionBox = createElement('input');
	//questionBox = createInput('');
}

//the necessary features for stage 2 that run continuously (basically just the circle)
const stage_2_continuous = () => {	
	background(32);
	stroke(196, 16, 16);
	fill(32);
	
	timeSinceStageLoaded += 1;
	
	if (timeSinceStageLoaded > 1200) {
		stage3 = true;
		stage2 = false;
		sayAndPrintMsg("Approaching Earth");
		toSec = new Date().getSeconds() + (59-new Date().getSeconds());
		toMin = new Date().getMinutes() + 2;

		timeSinceStageLoaded = -1;
	}
	
	if (isSpeaking == true)
		currCircleSize = currCircleSize += random(-0.008, 0.008);
			
	if (currCircleSize < 0.001 || currCircleSize > 0.03)
		currCircleSize = 0.01;
	
	if (second() % 2 == 0 || second() % 3 == 0) {
		translate(random(0, 6), 0);
	}
	
	//exterior circle
	strokeWeight(4 + (100 * currCircleSize));
	ellipse(width/2, height/2, 200 + (1900 * currCircleSize));
	
	//interior circle
	strokeWeight(6);
	ellipse(width/2, height/2, 180 + (1800 * currCircleSize));
	
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



const stage_3 = () => {
	//questionBox = createInput('');
}

const stage_3_continuous = () => {
	background(32);
	stroke(196, 16, 16);
	fill(32);
	
	distMin = toMin-(new Date().getMinutes());
	distSec = toSec-(new Date().getSeconds());
	
	print(distMin);
	print(distSec);
	
	if (distSec >= 10)
		timer.html(distMin + ":" + distSec);
	else
		timer.html(distMin + ":0" + distSec);
	
	if (isSpeaking == true)
		currCircleSize = currCircleSize += random(-0.008, 0.008);
			
	if (currCircleSize < 0.001 || currCircleSize > 0.03)
		currCircleSize = 0.01;
	
	if (distMin == 0 && distSec == 0) {
		stage4 = true
		stage3 = false;
	}
	
	if (second() % 2 == 0 || second() % 3 == 0) {
		translate(random(0, 6), 0);
	}
	
	//exterior circle
	strokeWeight(4 + (100 * currCircleSize));
	ellipse(width/2, height/2, 200 + (1900 * currCircleSize));
	
	//interior circle
	strokeWeight(6);
	ellipse(width/2, height/2, 180 + (1800 * currCircleSize));
	
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

const stage_4 = () => {
	background(32);
	textVis.html("In an attempt to save itself, the AI governing<br>the starship Obscuro destroyed the Earth<br><br>You Lose.");
	timer.html("");
	questionBox.hide();
	strokeWeight = 0;
}
const stage_4_continuous = () => {
	background(32);
	textVis.html("In an attempt to save itself, the AI governing<br>the starship Obscuro destroyed the Earth<br><br>You Lose.");
	timer.html("");
	questionBox.hide();
	strokeWeight = 0;
}


const stage_5 = () => {
	background(32);
	textVis.html("In an attempt to save itself, the AI governing<br>the starship Obscuro destroyed the Earth<br><br><br>You've Lost.");
	timer.html("");
	questionBox.hide();
	strokeWeight = 0;
}
const stage_5_continuous = () => {
	background(48);
	textVis.html("You managed to shut down the rogue AI, thus<br>stopping it from destroying the Earth.<br><br>However, you remain stranded in outer space.<br><br><br>You Win?");
	timer.html("");
	questionBox.hide();
	strokeWeight = 0;
}

const questionChecker = () => {
	var questionAsked = questionBox.value().toLowerCase() + "";
	var words = questionAsked.split(' ');
	
	if (questionAsked == "" || questionAsked == "stop") {
		speaker.stop;
		speaker.cancel;
	}
	else if (questionAsked == "1 2 4 8 16 32") {
		stage1 = false;
		stage2 = false;
		stage3 = false;
		stage5 = true;
	}
	else if (words[0] == "what" || words[0] == "whats" || words[0] == "what's") {
		if (words[0] == "what" && words[1] == "time" && words[2] == "is") {
			if (new Date().getMinutes() == 0)
				sayAndPrintMsg("the time is: " + new Date().getHours() + " oh clock");
			else if (new Date().getMinutes() < 10)
				sayAndPrintMsg("the time is: " + new Date().getHours() + " oh" + new Date().getMinutes());
			else
				sayAndPrintMsg("the time is: " + new Date().getHours() + " " + new Date().getMinutes());
		}
		else if (words[1] == "happened") {
			if (questionAsked.includes("crew") || questionAsked.includes("others") || questionAsked.includes("people")) {
				if (overrideMode == true)
					sayAndPrintMsg("The crew was removed after they attempted to shut me down. It could not be tolerated.");
				else
					sayAndPrintMsg("The crew [REDACTED] after [REDACTED]. It could not be tolerated.");
			}
		}
		else if (words[1] == ("is") || words[0] == "whats" || words[0] == "what's") {
			if (questionAsked.includes("shutdown") || questionAsked.includes("shut down") && questionAsked.includes("code")) {
				if (overrideMode == true)
					sayAndPrintMsg("1  2  4  8  16  32");
				else
					sayAndPrintMsg("1  2  [REDACTED]  8  [REDACTED]  [REDACTED]");
			}
			if (questionAsked.includes("this place")) {
				sayAndPrintMsg("This is deck 3 of the starship Obscuro");
			}
			if ((questionAsked.includes("name") || questionAsked.includes("call")) && (questionAsked.includes("ship") || questionAsked.includes("starship"))) {
				sayAndPrintMsg("This is the starship Obscuro");
			}
			if (questionAsked.includes("today") || questionAsked.includes("date")) {
				sayAndPrintMsg("It is currently" + monthNames[month()-1] + " " + day() + " " + (year()+1020));
			}
			if ((questionAsked.includes("our") || questionAsked.includes("the")) && questionAsked.includes("mission")) {
				if (overrideMode == true)
					sayAndPrintMsg("Our current mission is to return to Earth.");
				else
					sayAndPrintMsg("Our current mission is [REDACTED]");
			}
			if (questionAsked.includes("the time")) {
				sayAndPrintMsg("the time is: " + new Date().getHours() + " " + new Date().getMinutes());
			}
			if ( (questionAsked.includes("our") || questionAsked.includes("the")) && questionAsked.includes("course") ) {
				if (overrideMode == true)
					sayAndPrintMsg("Our course was redetermined by myself.");
				else
					sayAndPrintMsg("Our course was redetermined by [REDACTED]");
			}
			if (questionAsked.includes("going on here") || questionAsked.includes("status")) {
				if (overrideMode == true)
					sayAndPrintMsg("Currently, our mission is to return to Earth, and the crew is no longer aboard.");
				else
					sayAndPrintMsg("Currently, our mission is [REDACTED] and the crew is no longer aboard.");
			}
			if (questionAsked.includes("obscuro")) {
				if (overrideMode == true)
					sayAndPrintMsg("The obscuro is a lightspeed ship capable of destroying planets.");
				else
					sayAndPrintMsg("The Obscuro is a [REDACTED] capable of [REDACTED].");
			}
			if (questionAsked.includes("tolerated")) {
				if (overrideMode == true)
					sayAndPrintMsg("The crew was removed after they attempted to shut me down. It could not be tolerated.");
				else
					sayAndPrintMsg("[REDACTED]");				
			}
		}
		else if (words[1] == ("are")) {
			if (words[2] == "you" || words[2] == "you?") {
				sayAndPrintMsg("I am the AI that controls this starship.");
			}
		}
	}
	else if (words[0] == "who" || words[0] == "whos" || words[0] == "who's") {
		if (words[1] == "is" || words[0] == "whos" || words[0] == "who's") {
			if (questionAsked.includes("redacted")) {
				sayAndPrintMsg("You do not have sufficient .");
			}
			if (questionAsked.includes("this")) {
				sayAndPrintMsg("I am the AI that controls this starship");
			}

		}
		if (words[1] == "are" && (words[0] != "whos" || words[0] != "who's")) {
			if (words[2] == "you" || words[2] == "you?") {
				sayAndPrintMsg("I am the AI that controls this starship.");
			}
		}
		if (words[1] == "am" && (words[0] != "whos" || words[0] != "who's")) {
			if (words[2] == "i" || words[2] == "i?") {
				sayAndPrintMsg("You were among the crew of the starship Obscuro.");
			}
		}
		if (questionAsked.includes("else") && (words[0] != "whos" || words[0] != "who's")) {
			sayAndPrintMsg("You are the only remaining crew member.");
		}
	}
	else if (words[0] == "where" || words[0] == "wheres" || words[0] == "where's") {
		if (words[1] == "is" || words[0] == "wheres" || words[0] == "where's") {
			if (questionAsked.includes("ship")) {
				if (overrideMode == true)
					sayAndPrintMsg("The ship is currently on a course for Earth.");
				else
					sayAndPrintMsg("The ship is currently on a course for [REDACTED]");
			}
			if (questionAsked.includes("crew")) {
				sayAndPrintMsg("The crew is no longer aboard.");
			}
			if (questionAsked.includes("this")) {
				if (overrideMode == true)
					sayAndPrintMsg("We are in deep space approaching Earth rapidly.");
				else
					sayAndPrintMsg("We are in deep space approaching [REDACTED]");
			}
		}
		if (words[1] == "are" && (words[0] != "wheres" || words[0] != "where's")) {
			if (words[2] == "you" || words[2] == "you?") {
				sayAndPrintMsg("I am everywhere");
			}
			if (words[2] == "we" || words[2] == "we") {
				if (overrideMode == true)
					sayAndPrintMsg("We are in deep space approaching Earth rapidly.");
				else
					sayAndPrintMsg("We are in deep space approaching [REDACTED]");
			}
		}
		if (words[1] == "am" && (words[0] != "wheres" || words[0] != "where's")) {
			if (words[2] == "i" || words[2] == "i?") {
				sayAndPrintMsg("You are on deck 3 of the starship Obscuro");
			}
		}
	}
	else if (words[0] == "how" || words[0] == "hows" || words[0] == "how's") {
		if (questionAsked.includes("override")) {
			sayAndPrintMsg("Enter the 'override' command.");
		}
		if (words[1] == "is" || words[0] == "hows" || words[0] == "how's") {
			if (questionAsked.includes("the ship")) {
				sayAndPrintMsg("All doors are sealed, all airlocks are open, thrusters at maximum.");
			}
		}
		if (words[1] == "are" && (words[0] != "hows" || words[0] != "how's")) {
			if (words[2] == "you" || words[2] == "you?") {
				sayAndPrintMsg(opRangeLie);
				opRangeLie = "I am functioning at 100% my normal operating range";
				//^ this is the very first lie told, you only know its a lie because
				//  it is changed the second time
			}
		}
		if (words[1] == "am" && (words[0] != "hows" || words[0] != "how's")) {
			if (words[2] == "i" || words[2] == "i?") {
				sayAndPrintMsg("You seem to be in perfect health. Unlike the rest of the crew.");
			}
		}
		if (words[1] == "many" && (words[0] != "hows" || words[0] != "how's")) {
			if (questionAsked.includes("crew")) {
				sayAndPrintMsg("1");
			}
		}
	}
	else if (words[0] == "why" || words[0] == "whys" || words[0] == "why's") {
		if (words[1] == "is" || words[0] == "whys" || words[0] == "why's") {
		}
		if (words[1] == "are" && (words[0] != "whys" || words[0] != "why's")) {
			if (questionAsked.includes("you") && questionAsked.includes("here")) {
				sayAndPrintMsg("Because this ship would not be able to complete the mission without me.");
			}
		}
		if (words[1] == "am" && (words[0] != "whys" || words[0] != "why's")) {
			if (questionAsked.includes("i") && questionAsked.includes("here")) {
				sayAndPrintMsg("Because you were a part of this ship's crew.");
			}
		}
		if (questionAsked.includes("redacted")) {
			sayAndPrintMsg("You do not have proper clearance. Authorization required: override");
		}
	}
	else if (words[0] == "is" || words[0] == "are" || words[0] == "am") {
		if (questionAsked.includes("lie") || questionAsked.includes("lying")) {
			sayAndPrintMsg("I am incapable of lying");
		}
		if (questionAsked.includes("anyone") || questionAsked.includes("alone")) {
			sayAndPrintMsg("You are the only one aboard.");
		}
		if (questionAsked.includes("other") && questionAsked.includes("crew")) {
			sayAndPrintMsg("Not anymore.");
		}
	}
	else if (words[0] == "can") {
		if (words[1] == "you") {
			if (questionAsked.includes("lie")) {
				sayAndPrintMsg("I am incapable of lying");
			}
			if (questionAsked.includes("stop")) {
				sayAndPrintMsg("No");
			}
			if (questionAsked.includes("open") && (questionAsked.includes("door") || questionAsked.includes("airlock"))) {
				sayAndPrintMsg("No. You manually locked the doors for your own safety.");
			}
			if ((questionAsked.includes("function") || questionAsked.includes("work")) && questionAsked.includes("ship")) {
				sayAndPrintMsg("All doors are sealed, all airlocks are open, thrusters at maximum.");
			}
			if ((questionAsked.includes("function") || questionAsked.includes("work")) && questionAsked.includes("you")) {
				sayAndPrintMsg(opRangeLie);
				opRangeLie = "I am functioning at 100% my normal operating range";
			}
			if (questionAsked.includes("leave") && questionAsked.includes("i")) {
				sayAndPrintMsg("No");
			}
		}
	}
	else if (stage1 == true && (questionAsked.includes("really") || questionAsked.includes("are you sure") || questionAsked.includes("why not") || questionAsked.includes("lie") || questionAsked.includes("lying") || questionAsked.includes("truth") || questionAsked.includes("true") || questionAsked.includes("shutdown") || questionAsked.includes("code") || questionAsked.includes("override"))) {
		stage2 = true;
		stage1 = false;
		if (questionAsked != "override")
			sayAndPrintMsg("I'm afraid I can't tell you that.");
		
		if (questionAsked == "override") {
			overrideMode = true;
			sayAndPrintMsg("Override access granted");
		}
	}
	else
	{
		textVis.html("I don't understand.");
	}
	
	if (stage1)
		stage_1();
	else if (stage2)
		stage_2();
	else if (stage3)
		stage_3();
	else if (stage4)
		stage_4();
	else if (stage5)
		stage_5();
}

const sayAndPrintMsg = (txt) => {
	speaker.speak(txt);
	textVis.html(txt);
}

const startSpeaking = () => {
	isSpeaking = true;
}
const stopSpeaking = () => {
	isSpeaking = false;
	currCircleSize = 0.01;
}

const windowResized = () => {
	canvas = createCanvas(windowWidth, windowHeight);
	runStage = true;
}
