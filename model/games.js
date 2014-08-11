var Game = require('../model/game'),
	shortId = require('shortid');

var Games = function() {
	this.games = [];

	this.addGame = function() {
		var id = shortId.generate();
		this.games.push(new Game(id));
		return id;
	};

	this.getGame = function(id) {
		var gamesLen = this.games.length;
		for (var i = 0; i < gamesLen; i++) {
			if (this.games[i].id === id) {
				return this.games[i];
			}
		}
	};

	this.deleteGame = function(id) {
		var gamesLen = this.games.length;
		for (var i = 0; i < gamesLen; i++) {
			if (this.games[i].id === id) {
				this.games.splice(i, 1);
				break;
			}
		}
	};
}

module.exports = Games;