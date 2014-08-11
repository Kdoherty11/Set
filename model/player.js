var Player = function(name, regId) {
	this.numSets = 0;
	this.name = name;
	this.regId = regId;

	this.incrementScore = function() {
		this.numSets++;
	};
}

module.exports = Player;