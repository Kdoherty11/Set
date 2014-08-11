var Game = require('../model/game'),
	Player = require('../model/player'),
	Games = require('../model/games'),
	Set = require('../model/set'),
	SetSolver = require('../model/setSolver'),
	gcm = require('node-gcm');

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
	var playerRegId = req.body.regId;
	var player = new Player(playerName, regId);
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

exports.handleSet = function(req, res) {
	var numCards = req.body.length;
	console.log(numCards);
	console.log('is set ' + new Set(req.body[0], req.body[1], req.body[2]).isSet());
	if (numCards === 3 && new Set(req.body[0], req.body[1], req.body[2]).isSet()) {
		var id = req.param('id');
		var game = games.getGame(id);
		game.removeAll(req.body);
		game.deal(numCards);
		var tickle = new gcm.Message();
		res.json('Set!');
	} else {
		res.json('Not a set!');
	}
};

exports.incrementScore = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);

	var playerName = req.body.playerName;
	var player = game.getPlayerByName(playerName);

	player.incrementScore();

	res.json('OK');
};

exports.delete = function(req, res) {
	var id = req.param('id');
	games.deleteGame(id);
	res.json('OK');
};

exports.findSet = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);
	var setSolver = new SetSolver();
	var set = setSolver.findSet(game.activeCards);
	if (set === null) {
		res.json('There are no sets!');
	} else {
		res.json(set);
	}
};

