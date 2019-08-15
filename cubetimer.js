function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
pastScrambles = [];
var time = 0;
var theTimes = 0;
var timeArray = [];
var go = null;
var stop = false;
var amount = 0;
var average = 0;
var whole = [];
var scramble = document.getElementById("scrambleSpace");
var timeList = document.getElementById("timeList");
function setScramble() {
	var moveChoices = [" R", " D", " F"];
	var moveChoices2 = [" L", " U", " B"];
	var moveChoices3 = [" R2", " D2", " F2"];
	var moveChoices4 = [" L2", " U2", " B2"];
	var moveChoices5 = [" R'", " D'", " F'"];
	var moveChoices6 = [" L'", " U'", " B'"];
	moveChoices = shuffle(moveChoices);
	moveChoices2 = shuffle(moveChoices2);
	moveChoices3 = shuffle(moveChoices3);
	moveChoices4 = shuffle(moveChoices4);
	moveChoices5 = shuffle(moveChoices5);
	moveChoices6 = shuffle(moveChoices6);
	var scramble1 = moveChoices5.toString() + moveChoices4.toString() + moveChoices3.toString() + moveChoices2.toString() + moveChoices.toString() + moveChoices2.toString() + moveChoices3.toString() + moveChoices4.toString() + moveChoices5.toString() + moveChoices6.toString() + moveChoices.toString() + moveChoices4.toString() + moveChoices3.toString() + moveChoices2.toString();
	var scramble2 = moveChoices6.toString() + moveChoices.toString() + moveChoices4.toString() + moveChoices3.toString() + moveChoices4.toString() + moveChoices3.toString() + moveChoices2.toString() + moveChoices.toString() + moveChoices6.toString() + moveChoices5.toString() + moveChoices4.toString() + moveChoices3.toString() + moveChoices2.toString();
	scrambles = [scramble1, scramble2];
	scramble.innerHTML = scrambles[Math.round(Math.random())];
	pastScrambles.push(scramble.innerHTML);
}
setScramble();
var averageDisplay = document.getElementById("averages");
document.onkeyup = function(e) {
	e = e.window || e;
	var key = e.which || e.keyCode;
	if ((key==32) && (go == null)) {
		inspect();
		go = true;
	} else if ((key==32) && (go == true)) {
		startTimer();
		go = false;
		stop = false;
	} else if ((key==32) && (go == 'wait')) {
		go = null;
	}
}
var x = document.getElementById("x");
document.onkeydown = function(e) {
	e = e.window || e;
	var key = e.which || e.keyCode;
	if ((key==32) && (go == false)) {
		amount++;
		theTimes = theTimes+time;
		average = Math.round((theTimes/amount))/100 ;
		whole.push('<hr><font size="5" color="white"></font><b><a href="">' + time/100 + '</a><br><font size="3" color="grey">' + scramble.innerHTML + '<br>')
		timeList.innerHTML = '<hr><font size="5" color="white"></font><font size="9"><a>' + time/100 + '</a></font><b><br><font size="3" color="grey"></b>' + scramble.innerHTML + '<br>' + timeList.innerHTML;
		timeArray.push(time);
		averageDisplay.innerHTML = 'Mean: ' + average;
		setScramble();
		stop = true;
		time = 0;
		go = 'wait'
		if (amount > 0) {
			x.innerHTML = '<font size="10" color="darkred"><a href="javascript:removeTime(' + (amount-1) + ')" style="text-decoration:none"></a>'
		}
	}
}
function startTimer() {
	var timer = document.getElementById("timeSpace");
	var id = setInterval(frame,10)
	function frame() {
		if (go == false) {
			time++;
			timer.innerHTML = (time/100);
		}
	} if (stop == true) {
		clearInterval(id);
	}
}
function resetTimes() {
	document.location.reload();
}
function inspect() {
	var id = setInterval(frame,10);
	var timer = document.getElementById("timeSpace");
	var inspectTime = 1549;
	function frame() {
		if ((go == true) && (inspectTime > 0)) {
			inspectTime--;
			timer.innerHTML = '<font color="red">' + Math.round(inspectTime/100) + '</font>';
		} else {
			clearInterval(id);
		}
	}
}
function removeTime(a) {
	x.innerHTML = '';
	amount--;
	var timeElements = timeList.innerHTML;
	timeElements = timeElements.replace(whole[(a)],'');
	alert("Remove last time?");
	whole[(a-1)] = timeElements;
	timeList.innerHTML = whole[a];
	whole.splice(a,1);
	theTimes = theTimes - timeArray[(a-1)];
	timeArray = timeArray.splice((a-1),1);
	average = Math.round((theTimes/amount))/100;
	averageDisplay.innerHTML = "Mean: " + average;
}