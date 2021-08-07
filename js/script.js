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

 	sessionStorage.setItem("numOfPlayers", playerNum.toString());
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

	for (let i = 0; i < players.length; i++) {
		if (players[i] == player) {
			return false;
		}
	}

	return true;
}

//this is a dumb solution, each time you created a tournament then went back to the create
//tab to create a new one, the players from the last tournament were still in sessionStorage
function createLoad() {
	sessionStorage.clear();
	sessionStorage.setItem("tournamentType", tournamentType);
}

function singDbls() {
	var elem = document.getElementById("singDblsB");
	var sum = document.getElementById("sum1");
	
	if (elem.value == "Singles") {
		elem.value = "Doubles";
		document.getElementById("addPlayerInput2").hidden = false;
	} else {
		elem.value = "Singles";
		document.getElementById("addPlayerInput2").hidden = true;
	}

	singlesDoubles = elem.value;
	sum.innerHTML = singlesDoubles;
	clearArraySum(players);
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
		for (let i = 0; i < sessionStorage.getItem("numOfPlayers"); i++) {
			players[i] = (i+1) + ". " + players[i];
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
	var x = button.parentElement.remove();

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

//from w3schools.com/howto/howto_js_sort_table.asp
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("groupTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function generateMatch(playerOne, playerTwo) {
	var match = document.createElement("div");
	var firstPlayer = document.createElement("input");
	var secondPlayer = document.createElement("input");
	var vs = document.createElement("p");

	vs.append("  vs.  ");

	firstPlayer.type = "button";
	firstPlayer.value = playerOne;
	firstPlayer.classList.add("small-button", "top");
	firstPlayer.onclick = function() {groupMatchOutcome(this)};

	secondPlayer.type = "button";
	secondPlayer.value = playerTwo;
	secondPlayer.classList.add("small-button", "bottom");
	secondPlayer.onclick = function() {groupMatchOutcome(this)};

	match.append(firstPlayer);
	match.append(vs);
	match.append(secondPlayer);
	matches.append(match);
}

function swapA(arr, one, two) {
	var temp;
	temp = arr[one];
	arr[one] = arr[two];
	arr[two] = temp;
}

function swap(one, two) {
	var temp;
	temp = one;
	one = two;
	two = temp;
}

function randomize(arr) {
	var temp;
	for (let i = 0; i < 20; i++) {
		let num1 = Math.floor(Math.random() * arr.length); //gives random number 0 - arr.length
		let num2 = Math.floor(Math.random() * arr.length);
		swapA(arr, num1, num2);
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
		sessionStorage.setItem("numOfWinners", "1");
		sessionStorage.setItem(0, next.innerHTML);
	} else {
		next.innerHTML = winner;
	}
}

function showWinScreen() {
	var tournamentTypeN = sessionStorage.getItem("tournamentType");
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
	for (let i = 0; i < sessionStorage.getItem("numOfWinners"); i++) {
		winners[i] = sessionStorage.getItem(i);
	}
	document.getElementById("winner").innerHTML = arrToString(winners);
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