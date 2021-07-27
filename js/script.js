var singlesDoubles = "Singles";
var tournamentType = "Bracket";

function singDbls() {
	var elem = document.getElementById("singDblsB");
	var sum = document.getElementById("sum1");
	
	if (elem.value == "Singles") {
		elem.value = "Doubles";
		singlesDoubles = "Doubles";
		sum.innerHTML = singlesDoubles;
	} 
	else {
		elem.value = "Singles";
		singlesDoubles = "Singles";
		sum.innerHTML = singlesDoubles;
	}
}

var players = ["One", "Two", "Dick", "Stupid", "Five"];

function tournyType() {
	var elem = document.getElementById("tournyTypeB");
	var sum = document.getElementById("sum2");

	if (elem.value == "Bracket") {
		elem.value = "Round Robin";
		tournamentType = "Round Robin";
		sum.innerHTML = tournamentType;
	} else if (elem.value == "Round Robin") {
		elem.value = "Group => Bracket";
		tournamentType = "Group => Bracket";
		sum.innerHTML = tournamentType;
	} else {
		elem.value = "Bracket";
		tournamentType = "Bracket";
		sum.innerHTML = tournamentType;
	}
}

var winner;

function setPlayers() {
	var give;
	for(let i = 0; i < players.length; i++) {
		var j = i+10;
		var x = document.getElementById(j.toString())
		give = x.innerHTML;
		if (x != null) {
			x.innerHTML = players[i] + give;
		}
	}
}

function matchGet(button) {
	//gets us game id in x location
	var x = button.id;
	var xI = parseInt(x);

	winner = document.getElementById(x).parentElement.parentElement.innerHTML;
	//winner = winner.substring(0, winner.indexOf('<'));

	//z gets us the round number in x0 location
	var z = button.parentNode.parentNode.id;
	z = parseInt(z);
	z = parseInt(z / 10) * 10 + 10;

	//depending on the round we have to divide by a different value
	if (z == 20){
		var num = parseInt((xI-1) /2);
	} else if (z == 30) {
		var num = parseInt((xI-1) /4);
	}
	
	var y = num + z;

	var next = document.getElementById(y.toString());
	var nextRound = z +10;
	
	if (document.getElementById(nextRound.toString()) == null){
		next.innerHTML = winner.substring(0, winner.indexOf('<'));
	} else {
		next.innerHTML = winner;
	}
}