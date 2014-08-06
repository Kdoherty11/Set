var Game = require('../model/game'),
	Player = require('../model/player'),
	Games = require('../model/games');

var games = new Games();

exports.games = function(req, res) {
	res.json(games);
}

exports.getGame = function(req, res) {
	var gameIndex = req.param('number');
	res.json(games.getGame(gameIndex));
};

exports.cards = function(req, res) {
	var gameIndex = req.param('number');
	var game = games.getGame(gameIndex);
	res.json(game.activeCards)
}

exports.addGame = function(req, res) {
	games.addGame();
	res.json('OK');
};

exports.addPlayer = function(req, res) {
	var playerName = req.body.name;
	var gameIndex = req.param('number');
	var player = new Player(playerName);
	games.getGame(gameIndex).addPlayer(player);
	res.json('OK');
};

exports.deal = function(req, res) {
	var numCards = req.body.numCards;
	var gameIndex = req.param('number');
	games.getGame(gameIndex).deal(numCards);
	res.json('OK');
};

exports.remove = function(req, res) {

	 var gameIndex = req.param('number');
	 games.getGame(gameIndex).removeAll(req.body);

	 res.json('OK');
};

exports.incrementScore = function(req, res) {
	var gameIndex = req.param('number');
	var game = games.getGame(gameIndex);

	var playerId = req.body.playerId;
	var player = game.getPlayerById(playerId);

	player.incrementScore();

	res.json('OK');
};

