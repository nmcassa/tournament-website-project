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