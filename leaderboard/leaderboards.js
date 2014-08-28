var Leaderboard = require('./leaderboard');

var Leaderboards = function(keys) {

	this.leaderboardMap = {};

	this.fill = function() {
		var keysLen = keys.length;
		for (var i = 0; i < keysLen; i++) {
			var key = keys[i];
			this.leaderboardMap[key] = new Leaderboard();
		}
	};

	this.get = function(key) {
		return this.leaderboardMap[key];
	};
};

module.exports = function(keys) {
	var instance = new Leaderboards(keys);

	instance.fill();

	return instance;
};