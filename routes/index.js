var Game = require('../model/game'),
	Player = require('../model/player'),
	Games = require('../model/games');

var games = new Games();

exports.addGame = function(req, res) {
	games.addGame();
	res.json('OK');
};

exports.getGame = function(req, res) {
	var gameIndex = req.param('number');
	res.json(games.getGame(gameIndex));
};

exports.games = function(req, res) {
	res.json(games);
}

exports.cards = function(req, res) {
	var gameIndex = req.param('number');
	var game = games.getGame(gameIndex);
	res.json(game.activeCards)
}

exports.addPlayer = function(req, res) {
	var playerName = req.body.name;
	var gameIndex = req.param('number');
	var player = new Player(playerName);
	var game = games.getGame(gameIndex);
	if (game.players.length < 4) {
		game.addPlayer(player);
		res.json('OK');
	} else {
		res.json('Limit is 4 players')
	}
};

exports.deal = function(req, res) {
	var numCards = req.body.numCards;
	var gameIndex = req.param('number');
	games.getGame(gameIndex).deal(numCards);
	res.json('OK');
};

exports.removeCards = function(req, res) {
	 var gameIndex = req.param('number');
	 games.getGame(gameIndex).removeAll(req.body);
	 res.json('OK');
};

exports.replaceCards = function(req, res) {
	var gameIndex = req.param('number');
	var numCards = req.body.length;
	var game = games.getGame(gameIndex);
	game.removeAll(req.body);
	game.deal(numCards);

	res.json('OK');
}


exports.incrementScore = function(req, res) {
	var gameIndex = req.param('number');
	var game = games.getGame(gameIndex);

	var playerId = req.body.playerId;
	var player = game.getPlayerById(playerId);

	player.incrementScore();

	res.json('OK');
};

exports.delete = function(req, res) {
	var gameIndex = req.param('number');
	games.games.splice(gameIndex - 1, 1);
	res.json('OK');
}

