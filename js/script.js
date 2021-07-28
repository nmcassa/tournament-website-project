var singlesDoubles = "Singles";
var tournamentType = "Bracket";
var players = ["One", "Two", "Dumb", "Stupid", "Five"];
var playerNum;
var winner;
myStorage = window.sessionStorage;

function getPlayerNum(){
	var e = document.getElementById("dropDownPlayers");
 	playerNum = e.options[e.selectedIndex].text;
	document.getElementById("sum3").innerHTML = playerNum;
}

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

function passwordCheck() {
	var pass = document.getElementById("pwd").value;

	if (pass == "coolpassword") {
		sessionStorage.setItem(0, "Nick");
		sessionStorage.setItem(1, "Dillon");
		sessionStorage.setItem(2, "Justin");
		sessionStorage.setItem(3, "Luke");
		window.location.href = "../html/tournament.html";
	}
}

function setPlayers() {
	//to set players from the create page
	if (sessionStorage.length != 0) {
		for (let i = 0; i < sessionStorage.length; i++) {
			players[i] = sessionStorage.getItem(i);
		}
	}

	var give;
	for(let i = 0; i < players.length; i++) {
		var j = i+10;
		var x = document.getElementById(j.toString());
		//give is just the html for the span and the button so i add that to each player
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