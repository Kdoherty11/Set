var Set = require('./set')

var SetSolver = function() {

	this.findSet = function(cards) {
		console.log('in find set');
		var cardsLen = cards.length;
		console.log('after cards len');
		if (cardsLen < 3) {
			return null;
		}

		console.log('after check starting loops');

		for (var i = 0; i < cardsLen - 2; i++) {
			for (var j = i + 1; j < cardsLen - 1; j++) {
				for (var k = j + 1; k < cardsLen; k++) {
					console.log('creating set');
					var set = new Set(cards[i], cards[j], cards[k]);
					console.log('checking set ' + set);
					if (set.isSet()) {
						console.log('found set');
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