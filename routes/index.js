var Game = require('../model/game'),
	Player = require('../model/player'),
	Games = require('../model/games');

var games = new Games();

exports.addGame = function(req, res) {
	var id = games.addGame();
	res.json(id);
};

exports.getGame = function(req, res) {
	var id = req.param('id');
	res.json(games.getGame(id));
};

exports.games = function(req, res) {
	res.json(games);
};

exports.cards = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);
	res.json(game.activeCards)
};

exports.addPlayer = function(req, res) {
	var playerName = req.body.name;
	var player = new Player(playerName);
	var id = req.param('id');
	var game = games.getGame(id);
	if (game.players.length < 4) {
		game.addPlayer(player);
		res.json('OK');
	} else {
		res.json('Limit is 4 players')
	}
};

exports.deal = function(req, res) {
	var numCards = req.body.numCards;
	var id = req.param('id');
	games.getGame(id).deal(numCards);
	res.json('OK');
};

exports.removeCards = function(req, res) {
	 var id = req.param('id');
	 games.getGame(id).removeAll(req.body);
	 res.json('OK');
};

exports.replaceCards = function(req, res) {
	var id = req.param('id');
	var numCards = req.body.length;
	var game = games.getGame(id);
	game.removeAll(req.body);
	game.deal(numCards);
	res.json('OK');
};

exports.incrementScore = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);

	var playerId = req.body.playerId;
	var player = game.getPlayerById(playerId);

	player.incrementScore();

	res.json('OK');
};

exports.delete = function(req, res) {
	var id = req.param('id');
	games.deleteGame(id);
	res.json('OK');
};

