function addWinnerToLeaderboard(winner) {
	if (winner.charAt(1) == ".") {
		winner = winner.substring(3);
	}

	if (localStorage.getItem("leaderboardArray") == null) {
		localStorage.setItem("leaderboardArray", winner);
		localStorage.setItem("leaderboardWins", 1);
		localStorage.setItem("leaderboardLosses", 0);
		localStorage.setItem("leaderboardTournamentWins", 0);
	} else if (!inLeaderboardArray(winner)) {
		localStorage.setItem("leaderboardArray", localStorage.getItem("leaderboardArray") + " " + winner);
		localStorage.setItem("leaderboardWins", localStorage.getItem("leaderboardWins") + " " + 1);
		localStorage.setItem("leaderboardLosses", localStorage.getItem("leaderboardLosses") + " " + 0);
		localStorage.setItem("leaderboardTournamentWins", localStorage.getItem("leaderboardTournamentWins") + " " + 0);
	} else {
		const localPlayers = localStorage.getItem("leaderboardArray").split(" ");
		var localWins = localStorage.getItem("leaderboardWins").split(" ");

		for (let i = 0; i < localPlayers.length; i++) {
			if (localPlayers[i] == winner) {
				var winningIndex = i;
			}
		}

		//this changes the local arr and then changes the localStorage to that arr
		localWins[winningIndex] = parseInt(localWins[winningIndex]) + 1;
		localStorage.setItem("leaderboardWins", arrToString(localWins));
	}
}

function subtractWinnerFromLeaderboard(dumb) {
	const localPlayers = localStorage.getItem("leaderboardArray").split(" ");
	var localWins = localStorage.getItem("leaderboardWins").split(" ");
	for (let i = 0; i < localPlayers.length; i++) {
		if (localPlayers[i] == dumb) {
			var winningIndex = i;
		}
	}

	//this changes the local arr and then changes the localStorage to that arr
	localWins[winningIndex] = parseInt(localWins[winningIndex]) - 1;
	localStorage.setItem("leaderboardWins", arrToString(localWins));
}

function addLoserToLeaderboard(loser) {
	if (localStorage.getItem("leaderboardArray") == null) {
		localStorage.setItem("leaderboardArray", loser);
		localStorage.setItem("leaderboardWins", 0);
		localStorage.setItem("leaderboardLosses", 1);
		localStorage.setItem("leaderboardTournamentWins", 0);
	} else if (!inLeaderboardArray(loser)) {
		localStorage.setItem("leaderboardArray", localStorage.getItem("leaderboardArray") + " " + loser);
		localStorage.setItem("leaderboardWins", localStorage.getItem("leaderboardWins") + " " + 0);
		localStorage.setItem("leaderboardLosses", localStorage.getItem("leaderboardLosses") + " " + 1);
		localStorage.setItem("leaderboardTournamentWins", localStorage.getItem("leaderboardTournamentWins") + " " + 0);
	} else {
		const localPlayers = localStorage.getItem("leaderboardArray").split(" ");
		var localLosses = localStorage.getItem("leaderboardLosses").split(" ");

		for (let i = 0; i < localPlayers.length; i++) {
			if (localPlayers[i] == loser) {
				var losingIndex = i;
			}
		}

		//this changes the local arr and then changes the localStorage to that arr
		localLosses[losingIndex] = parseInt(localLosses[losingIndex]) + 1;
		localStorage.setItem("leaderboardLosses", arrToString(localLosses));
	}
}

function addTournamentWin(winner) {
	var winners = winner.split(" ");
	const localPlayers = localStorage.getItem("leaderboardArray").split(" ");
	var localTournamentWins = localStorage.getItem("leaderboardTournamentWins").split(" ");
	var winningIndex = [];

	for (let i = 0; i < localPlayers.length; i++) {
		for (let j = 0; j < winners.length; j++) {
			if (localPlayers[i] == winners[j]) {
				winningIndex.push(i);
			}
		}
	}
	
	//this changes the local arr and then changes the localStorage to that arr
	for (let i = 0; i < winningIndex.length; i++){
		localTournamentWins[winningIndex[i]] = parseInt(localTournamentWins[winningIndex[i]]) + 1;
		localStorage.setItem("leaderboardTournamentWins", arrToString(localTournamentWins));
	}
}

function inLeaderboardArray(target) {
	const localPlayers = localStorage.getItem("leaderboardArray").split(" ");

	for (let i = 0; i < localPlayers.length; i++) {
		if (localPlayers[i] == target) {
			return true;
		}
	}

	return false;
}

function setLeaderboard() {
	if (localStorage.getItem("leaderboardArray") == null) {
		return;
	}

	var localPlayers = localStorage.getItem("leaderboardArray").split(" ");
	var localWins = intifyArr(localStorage.getItem("leaderboardWins").split(" "));
	var localLosses = intifyArr(localStorage.getItem("leaderboardLosses").split(" "));
	var localTournaWins = intifyArr(localStorage.getItem("leaderboardTournamentWins").split(" "));

	sortParallel(localLosses, localWins, localPlayers, localTournaWins);

	setTotalWins(localPlayers, localWins);
	setWinPercent(localPlayers, localWins, localLosses);

	secondSort(localPlayers, localTournaWins);

	setTournamentWins(localPlayers, localTournaWins);
}

function intifyArr(arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = parseInt(arr[i]);
	}
	return arr;
}

function setTotalWins(arr, numsArr) {
	for (let i = 0; i < arr.length; i++) {
		var newListItem = document.createElement("li");
		newListItem.innerHTML = arr[i] + ": " + numsArr[i];
		wins.append(newListItem);
	}
}

function setWinPercent(arr, winArr, loseArr) {
	for (let i = 0; i < arr.length; i++) {
		var newListItem = document.createElement("li");
		newListItem.innerHTML = arr[i] + ": " + 
			Number.parseFloat((winArr[i] / (parseInt(loseArr[i]) + parseInt(winArr[i]))*100).toPrecision(2))
			+ "%";
		winPercentage.append(newListItem);
	}
}

function setTournamentWins(arr, winArr){
	for (let i = 0; i < arr.length; i++) {
		var newListItem = document.createElement("li");
		newListItem.innerHTML = arr[i] + ": " + winArr[i];
		tournamentWins.append(newListItem);
	}
}