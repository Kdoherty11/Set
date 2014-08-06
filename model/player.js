var Player = function(id) {
	this.numSets = 0;
	this.id = id;

	this.incrementScore = function() {
		this.numSets++;
	};

	this.getId = function() {
		return id;
	};
}

module.exports = Player;