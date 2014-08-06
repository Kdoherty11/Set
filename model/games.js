var Game = require('../model/game');

var Games = function() {
	this.games = [];

	this.addGame = function() {
		this.games.push(new Game());
	};

	this.getGame = function(index) {
		// Allow URL to start at 1
		var gameIndex = index - 1;

		if (gameIndex < this.games.length) {
			return this.games[gameIndex];
		} else {
			console.log('Index ' + gameIndex + 
			' is out of bounds. Must be less than '
			 + this.games.length);
		}
	}

	this.addPlayer = function(player, index) {
		this.getGame(index).addPlayer(player);
	}
}

module.exports = Games;