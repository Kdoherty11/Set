var Game = require('../model/game'),
	Player = require('../model/player'),
	Games = require('../model/games'),
	Set = require('../model/set'),
	leaderboardModel = require('../schemas/leaderboard-model');

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
	var name = req.body.name;
	var player = new Player(name);
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
		var id = req.param('id');
		var game = games.getGame(id);
		var resp = game.handleSet(req.body);
		res.json(resp);
};

exports.incrementScore = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);

	var name = req.body.name;
	var player = game.getPlayerByName(name);

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
	var set = game.findSet();
	if (set === null) {
		res.json('There are no sets!');
	} else {
		res.json(set);
	}
};

// Removes a player from the game and then deletes the game
// if there are no players left in the game
exports.removePlayer = function(req, res) {
	var id = req.param('id');
	var game = games.getGame(id);
	var name = req.body.name;
	if (game.players.length === 1) {
		games.deleteGame(id);
	} else {
		game.removePlayer(name);
	}
	res.json('OK');
};

exports.getPracticeLeaderboard = function(req, res) {
	var key = req.param('key');
	leaderboardModel.find({'mode': 'practice', 'key': key}).sort({score: 'descending'}).exec(function (err, docs) {
       		 res.json(docs);
    });
};

exports.addPracticeEntry = function(req, res) {
	var key = req.param('key');
	var playerName = req.body.name;
	var playerScore = req.body.score;
	leaderboardModel.insertEntry(playerName, playerScore, 'practice', key, function(a, b) {
		return a < b;
	});
	res.json('OK');
};

exports.getRaceLeaderboard = function(req, res) {
	var key = req.param('key');
	leaderboardModel.find({'mode': 'race', 'key': key}).sort({score: 'ascending'}).exec(function (err, docs) {
       		 res.json(docs);
    });
}

exports.addRaceEntry = function(req, res) {
	var key = req.param('key');
	var playerName = req.body.name;
	var playerScore = req.body.score;
	leaderboardModel.insertEntry(playerName, playerScore, 'race', key, function(a, b) {
		return a > b;
	});
	res.json('OK');
};


