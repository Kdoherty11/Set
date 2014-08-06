var Player = function(id) {
	this.numSets = 0;
	this.id = id;

	this.incrementScore = function() {
		this.numSets++;
	};
}

module.exports = Player;