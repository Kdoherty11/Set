var Player = function(name) {
	this.score = 0;
	this.name = name;

	this.incrementScore = function() {
		this.score++;
	};
}

module.exports = Player;