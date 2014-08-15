var Set = require('./set')

var SetSolver = function() {

	this.findSet = function(cards) {
		var cardsLen = cards.length;
		if (cardsLen < 3) {
			return null;
		}

		for (var i = 0; i < cardsLen - 2; i++) {
			for (var j = i + 1; j < cardsLen - 1; j++) {
				for (var k = j + 1; k < cardsLen; k++) {
					var set = new Set(cards[i], cards[j], cards[k]);
					if (set.isSet()) {
						return set;
					}
				}
			}
		}
		// No Set was found
		return null;
	};
}

module.exports = SetSolver;