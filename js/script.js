var singlesDoubles = "Singles";
var tournamentType = "Bracket";
var players = [];
var playerNum = -1;
var winner;
myStorage = window.sessionStorage;

function getPlayerNum(){
	//get player num and put it in sum
	var e = document.getElementById("dropDownPlayers");
 	playerNum = e.options[e.selectedIndex].text;

 	//if a number like 5 or 6 is chosen an error message will be shown bc that will
 	//not go in the bracket and is not a valid bracket playerNum
 	if ((playerNum != 4 && playerNum != 8) && (tournamentType == "Bracket")) {
 		document.getElementById("error").innerHTML = "Wrong tournament type";
 		return;
 	}

	document.getElementById("sum3").innerHTML = playerNum;
	document.getElementById("error").innerHTML = "";
}

function addPlayer() {
	//add a second player input for doubles
	if (singlesDoubles == "Singles") {
		var player = document.getElementById("addPlayerInput").value;
	} else {
		var player = document.getElementById("addPlayerInput").value + "/" + 
			document.getElementById("addPlayerInput2").value;
	}
	

	if (!validPlayer(player)) {
		document.getElementById("error").innerHTML = "Invalid player name";
		return;
	}

	if (playerNum == -1) {
		document.getElementById("error").innerHTML = "Choose amount of players";
		return;
	}

	if (players.length == playerNum) {
		document.getElementById("error").innerHTML = "Max players";
		return;
	}

	players.push(player);

	document.getElementById("sum4").innerHTML = arrToString(players);

	document.getElementById("addPlayerInput").value = "";
	if (singlesDoubles == "Doubles") {
		document.getElementById("addPlayerInput2").value = "";
	}
	document.getElementById("error").innerHTML = "";
}

function validPlayer(player) {
	if (singlesDoubles == "Doubles") {
		if (document.getElementById("addPlayerInput").value == "" || document.getElementById("addPlayerInput2").value == "") {
			return false;
		}
	}

	if (player.length == 0) {
		return false;
	}

	for (let i = 0; i < player.length; i++) {
		if (player.charAt(i) == ' ') {
			return false;
		}
	}

	return true;
}

//this is a dumb solution, each time you created a tournament then went back to the create
//tab to create a new one, the players from the last tournament were still in sessionStorage
function createLoad() {
	sessionStorage.clear();
}

function singDbls() {
	var elem = document.getElementById("singDblsB");
	var sum = document.getElementById("sum1");
	
	if (elem.value == "Singles") {
		elem.value = "Doubles";
		singlesDoubles = "Doubles";
		sum.innerHTML = singlesDoubles;
		document.getElementById("addPlayerInput2").hidden = false;
		clearArraySum(players);
	} 
	else {
		elem.value = "Singles";
		singlesDoubles = "Singles";
		sum.innerHTML = singlesDoubles;
		document.getElementById("addPlayerInput2").hidden = true;
		clearArraySum(players);
	}
}

//just for on the create page
function clearArraySum(arr) {
	arr.length = 0;
	document.getElementById("sum4").innerHTML = "No players yet";
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

	if (pass == "cock") {
		sessionStorage.setItem(0, "Nick");
		sessionStorage.setItem(1, "Dillon");
		sessionStorage.setItem(2, "Justin");
		sessionStorage.setItem(3, "Luke");
		window.location.href = "../html/tournament.html";
	}
}

function create() {
	if (players.length != playerNum) {
		document.getElementById("error").innerHTML = "Not enough players!";
		return;
	}

	for (let i = 0; i < players.length; i++) {
		sessionStorage.setItem(i, players[i]);
	}

	if (tournamentType == "Bracket" && playerNum == 4) {
		window.location.href = "../html/tournament.html";
	} else if (tournamentType == "Bracket" && playerNum == 8) {
		window.location.href = "../html/tournament8.html";
	}
}

function setPlayers() {
	//to set players from the create page
	if (sessionStorage.length != 0) {
		for (let i = 0; i < sessionStorage.length; i++) {
			players[i] = sessionStorage.getItem(i);
		}
	}

	players = randomize(players);

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

function randomize(arr) {
	var temp;
	for (let i = 0; i < 20; i++) {
		let num1 = Math.floor(Math.random() * arr.length); //gives random number 0 - arr.length
		let num2 = Math.floor(Math.random() * arr.length);
		temp = arr[num1];
		arr[num1] = arr[num2];
		arr[num2] = temp;
	}
	return arr;
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
	} else if (z == 40) {
		var num = parseInt((xI-1) /8);
	}
	
	var y = num + z;

	var next = document.getElementById(y.toString());
	var nextRound = z +10;

	if (document.getElementById(nextRound.toString()) == null){
		next.innerHTML = winner.substring(0, winner.indexOf('<'));
		finish.hidden = false;
		sessionStorage.setItem(10, next.innerHTML);
	} else {
		next.innerHTML = winner;
	}
}

function showWinScreen() {
	window.location.href="../html/winnerScreen.html";
}

function winLoad() {
	document.getElementById("winner").innerHTML = sessionStorage.getItem(10);
}

function arrToString(arr) {
	var str = "";
	for (let i = 0; i < arr.length; i++) {
		if (i == arr.length-1) {
			str = str + arr[i];
		} else {
			str = str + arr[i] + ", ";
		}
	}
	return str;
}