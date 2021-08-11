var singlesDoubles = "Singles";
var tournamentType = "Bracket";
var players = [];
var playerNum = -1;
var winner;
myStorage = window.sessionStorage;
myStorage = window.localStorage;

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
	} else if (playerNum == -1) {
		document.getElementById("error").innerHTML = "Choose amount of players";
		return;
	} else if (players.length == playerNum) {
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

	for (let i = 0; i < players.length; i++) {
		if (players[i] == player) {
			return false;
		}
	}

	return true;
}

function createLoad() {
	sessionStorage.clear();
	sessionStorage.setItem("tournamentType", tournamentType);
}

function tournyType() {
	var elem = document.getElementById("tournyTypeB");
	var sum = document.getElementById("sum2");

	if (elem.value == "Bracket") {
		elem.value = "Round Robin";
	} else if (elem.value == "Round Robin") {
		elem.value = "Group => Bracket";
	} else {
		elem.value = "Bracket";	}

	tournamentType = elem.value;
	sum.innerHTML = tournamentType;
	sessionStorage.setItem("tournamentType", tournamentType);
}

function passwordCheck() {
	var pass = document.getElementById("pwd").value;

	if (pass == "cock") {
		sessionStorage.setItem(0, "Nick");
		sessionStorage.setItem(1, "Dillon");
		sessionStorage.setItem(2, "Justin");
		sessionStorage.setItem(3, "Luke");
		sessionStorage.setItem("tournamentType", "Group => Bracket");
		sessionStorage.setItem("numOfPlayers", "4");
		window.location.href = "../html/groupStage.html";
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
	} else if (tournamentType != "Bracket") {
		window.location.href = "../html/groupStage.html";
	}
}

function setPlayers() {
	//to set players from the create page
	for (let i = 0; i < sessionStorage.getItem("numOfPlayers"); i++) {
		players[i] = sessionStorage.getItem(i);
	}

	if (sessionStorage.getItem("tournamentType") == "Bracket"){
		players = randomize(players);
	} else {
		if (sessionStorage.getItem("numOfPlayers") == 4) {
			var seeded = [1, 4, 3, 2];
		} else if (sessionStorage.getItem("numOfPlayers") == 8) {
			var seeded = [1, 8, 4, 5, 6, 3, 7, 2];
		} else {
			alert('what the fuck');
		}
		
		for (let i = 0; i < sessionStorage.getItem("numOfPlayers"); i++) {
			seeded[i] = (seeded[i]) + ". " + players[seeded[i]-1];
		}
		players = seeded;
		sessionStorage.setItem("tournamentType", "Bracket");
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

function setPlayersGroup() {
	//to set players from the create page
	for (let i = 0; i < sessionStorage.getItem("numOfPlayers"); i++) {
		players[i] = sessionStorage.getItem(i);
	}
	
	//change the finish button's onclick function
	if (sessionStorage.getItem("tournamentType") != "Round Robin") {
		document.getElementById("finish").onclick = function() {getNewBracketFromGroups()};
	}

	players = randomize(players);

	for (let i = 0; i < players.length; i++) {
		var groupStageRow = document.createElement("tr");
		var groupStagePlayer = document.createElement("td");
		var groupStageWins = document.createElement("td");
		var groupStageLosses = document.createElement("td");

		groupStagePlayer.innerHTML = players[i];
		groupStagePlayer.id = "" + players[i];

		groupStageWins.innerHTML = 0;
		groupStageWins.id = players[i] + "Wins";

		groupStageLosses.innerHTML = 0;
		groupStageLosses.id = players[i] + "Losses";

		groupStageRow.append(groupStagePlayer);
		groupStageRow.append(groupStageWins);
		groupStageRow.append(groupStageLosses);
		groupTable.append(groupStageRow);
	}

	for (let i = 0; i < players.length-1; i++) {
		for (let j = i + 1; j < players.length; j++) {
			if ((i + j) % 2 == 0) {
				var playerOne = players[i];
				var playerTwo = players[j];
			} else {
				var playerOne = players[j];
				var playerTwo = players[i];
			}
			generateMatch(playerOne, playerTwo);
		}
	}
}

function groupMatchOutcome(button) {
	var winner = button.value;
	var loser;

	//get an array of the elements in the table row
	var c = button.parentElement.childNodes

	//figure out the loser
	if (c[0].value == winner) {
		loser = c[2].value;
	} else {
		loser = c[0].value;
	}

	//leaderboard add
	addWinnerToLeaderboard(winner);
	addLoserToLeaderboard(loser);

	//increment wins by one on the table
	var winningId = winner + "Wins";
	var numOfWins = parseInt(document.getElementById(winningId).innerHTML);
	numOfWins = numOfWins + 1;
	document.getElementById(winningId).innerHTML = numOfWins;

	//increment losses by one on the table
	var loserId = loser + "Losses";
	var numOfLosses = parseInt(document.getElementById(loserId).innerHTML);
	numOfLosses = numOfLosses + 1;
	document.getElementById(loserId).innerHTML = numOfLosses;

	//get rid of the match div
	button.parentElement.remove();

	sortTable();

	if (document.getElementById("matches").childElementCount == 0) {
		finish.hidden = false;
		if (sessionStorage.getItem("tournamentType") == "Round Robin") {
			let num = checkWinners();
			for(let i = 0; i < num; i++) {
				sessionStorage.setItem(i, winners[i]);
			}
			let n = num.toString();
			sessionStorage.setItem("numOfWinners", n);
		} 
	}
}

var winners = [];

function checkWinners() {
	var table = document.getElementById("groupTable");
	winners.push(table.rows[1].getElementsByTagName("TD")[0].innerHTML);

	for (let i = 1; i < table.rows.length - 1; i++) {
		var x = table.rows[i].getElementsByTagName("TD")[1];
    var y = table.rows[i + 1].getElementsByTagName("TD")[1];

		if (Number(x.innerHTML) == Number(y.innerHTML)) {
			winners.push(table.rows[i + 1].getElementsByTagName("TD")[0].innerHTML);
		} else {
			break;
		}
	}
	return winners.length;
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
	var nextRound = z + 10;

	addWinnerToLeaderboard(winner.substring(0, winner.indexOf('<')));

	if (document.getElementById(nextRound.toString()) == null){
		next.innerHTML = winner.substring(0, winner.indexOf('<'));
		finish.hidden = false;
		sessionStorage.setItem("numOfWinners", "1");
		sessionStorage.setItem("winner", next.innerHTML);
	} else {
		next.innerHTML = winner;
	}
}

function showWinScreen() {
	var tournamentTypeN = sessionStorage.getItem("tournamentType");
	if (tournamentTypeN != "Round Robin") {
		for (let i = 0; i < sessionStorage.getItem("numOfPlayers"); i++) {
			if (sessionStorage.getItem("winner") == sessionStorage.getItem(i)) {}
			else {
				addLoserToLeaderboard(sessionStorage.getItem(i));
			}
		}
	}

	if (tournamentTypeN == "Bracket" || tournamentTypeN == "Round Robin") {
		window.location.href="../html/winnerScreen.html";
	} 
}

function getNewBracketFromGroups(){
	var table = document.getElementById("groupTable");

	for (let i = 1; i < table.rows.length; i++) {
		sessionStorage.setItem(i-1, table.rows[i].getElementsByTagName("TD")[0].innerHTML);
	}

	if (sessionStorage.getItem("numOfPlayers") < 8) {
		sessionStorage.setItem("numOfPlayers", 4);
		window.location.href = "../html/tournament.html";

	} else {
		sessionStorage.setItem("numOfPlayers", 8);
		window.location.href = "../html/tournament8.html";
	}
}

function winLoad() {
	if (sessionStorage.getItem("tournamentType") != "Round Robin") {
		document.getElementById("winner").innerHTML = sessionStorage.getItem("winner");
	} else {
		for (let i = 0; i < sessionStorage.getItem("numOfWinners"); i++) {
			winners[i] = sessionStorage.getItem(i);
		}
		document.getElementById("winner").innerHTML = arrToString(winners);
	}
	addTournamentWin(document.getElementById("winner").innerHTML);
}