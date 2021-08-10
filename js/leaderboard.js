function addWinnerToLeaderboard(winner) {
	if (localStorage.getItem("leaderboardArray") == null) {
		localStorage.setItem("leaderboardArray", winner);
		localStorage.setItem("leaderboardWins", 1);
		localStorage.setItem("leaderboardLosses", 0);
	} else if (!inLeaderboardArray(winner)) {
		localStorage.setItem("leaderboardArray", localStorage.getItem("leaderboardArray") + " " + winner);
		localStorage.setItem("leaderboardWins", localStorage.getItem("leaderboardWins") + " " + 1);
		localStorage.setItem("leaderboardLosses", localStorage.getItem("leaderboardLosses") + " " + 0);
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

function addLoserToLeaderboard(loser) {
	if (localStorage.getItem("leaderboardArray") == null) {
		localStorage.setItem("leaderboardArray", loser);
		localStorage.setItem("leaderboardWins", 0);
		localStorage.setItem("leaderboardLosses", 1);
	} else if (!inLeaderboardArray(loser)) {
		localStorage.setItem("leaderboardArray", localStorage.getItem("leaderboardArray") + " " + loser);
		localStorage.setItem("leaderboardWins", localStorage.getItem("leaderboardWins") + " " + 0);
		localStorage.setItem("leaderboardLosses", localStorage.getItem("leaderboardLosses") + " " + 1);
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

function inLeaderboardArray(target) {
	const localPlayers = localStorage.getItem("leaderboardArray").split(" ");

	for (let i = 0; i < localPlayers.length; i++) {
		if (localPlayers[i] == target) {
			return true;
		}
	}

	return false;
}