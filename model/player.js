var Player = function(name) {
	this.numSets = 0;
	this.name = name;

	this.incrementScore = function() {
		this.numSets++;
	};
}

module.exports = Player;