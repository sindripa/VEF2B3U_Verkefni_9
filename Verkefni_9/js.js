//reference / breytur
var elSpurningar = document.getElementById("spurning");
var elSvor = document.getElementById("svarmoguleikar");
var elScore = document.getElementById("scoreCounter");
var elRandomEvent = document.getElementById("randomEvent");
var score = 0;
var questionNumber = 0;
var wrongAnswer = 0;
var rightAnswer = 0;
var eventCounter = 0;

//score display
function scoreDisplay() {
	let pid = document.createElement('p');
	pid.textContent = "Score: ";
	let strongid = document.createElement('strong');
	strongid.appendChild(document.createTextNode(score));
	pid.appendChild(strongid);
	return pid;
};

function scoreReDisplay() {
	let stig = scoreDisplay();
	elScore.appendChild(stig);
};

scoreReDisplay();

//answer display
function answerDisplay() {
	let pid = document.createElement('p');
	pid.textContent = "Right answers: ";
	let strongid = document.createElement('strong');
	strongid.appendChild(document.createTextNode(rightAnswer));
	pid.appendChild(strongid);
	let spanid = document.createElement('span');
	spanid.appendChild(document.createTextNode(' | Wrong answers: '));
	pid.appendChild(spanid);
	let strongid2 = document.createElement('strong');
	strongid2.appendChild(document.createTextNode(wrongAnswer));
	pid.appendChild(strongid2);
	return pid;
}

function answersUnite() {
	let answers = answerDisplay();
	elSvor.appendChild(answers);
}

//constructor
function Spurningar(texti,svor,rett) {
	this.text = texti;
	this.answers = svor;
	this.correct = rett;
};

//spurninga array
var spurning = [
	new Spurningar("Hvað eru sextán plús tíu frá tíundakerfi jafnt og í sextándakerfi?",["2B","1A","C8","FF"],"1A"),
	new Spurningar("Er Windows 10 merkið fimm rauðir hringir?",["Já","Nei"],"Nei"),
	new Spurningar("Hversu margar fætur eru kóngulær með?",["1","2","3","Of margar"],"Of margar")
];

//setur svörin í texta format
Spurningar.prototype.writeAnswersInHTML = function() {
	var olid = document.createElement('ol');
	olid.type = "A";
	for (var i = 0; i < this.answers.length; i++) {
		var temp = document.createElement('li');
		var temp2 = document.createTextNode(this.answers[i]);
		temp.appendChild(temp2);
		temp.className = ("svar");
		olid.appendChild(temp);
	}
	return olid;
};

//setur spurninguna í text ready format
Spurningar.prototype.writeQuestionInHTML = function() {
	return this.text;
};

function shuffleArray(array) {
 let m = array.length, t, i;
 // While there remain elements to shuffle…
 while (m) {
 // Pick a remaining element…
 i = Math.floor(Math.random() * m--);
 // And swap it with the current element.
 t = array[m];
 array[m] = array[i];
 array[i] = t;
 }
 return array;
};

shuffleArray(spurning);

//skrifað út
function skrifaUt() {
	elSpurningar.appendChild(document.createTextNode(spurning[questionNumber].writeQuestionInHTML()));
	elSvor.appendChild(spurning[questionNumber].writeAnswersInHTML());
};

skrifaUt();

//selection stuffið
function selected(e) {

	var target = e.target;

	if (target.nodeName.toLowerCase() == "li") {
		if (target.textContent == spurning[questionNumber].correct) {
    		target.className += "Green";
    		score++;
    		rightAnswer++;
    		questionNumber++;
    		response();
    	}
		else {
			target.className += "Red";
    		score--;
    		wrongAnswer++;
    		questionNumber++;
    		response();
		}
	}

};

//event hlustarar
elSvor.addEventListener("click", selected, false);

//clear question and answers function
function clearQuestionAndAnswers() {
	elSpurningar.innerHTML = "";
	elSvor.innerHTML = "";
	elScore.innerHTML = "";
	elRandomEvent.innerHTML = "";
	eventCounter = 0;
};

//question check
function questionCheck() {
	if (questionNumber >= (spurning.length)) {
		answersUnite();
	}
	else {
		skrifaUt();
	}
};

function response() {
	setTimeout(function () {
		alert('Press "OK" to continue.');
	    clearQuestionAndAnswers();
	    setTimeout(function() {
	    	scoreReDisplay();
	    	questionCheck();
	    }, 100);
	}, 50);
}


//randomEvent
function randomEventTemplateDisplay() {
	let pid = document.createElement('p');
	pid.textContent = "Good job, you scrolled";
	return pid;
};

function randomEventDisplay() {
	let eventid = randomEventTemplateDisplay();
	elRandomEvent.appendChild(eventid);
};

window.addEventListener("scroll", function() {
		if (eventCounter < 1) {
			randomEventDisplay();
			eventCounter++;
		}
	}
, false);