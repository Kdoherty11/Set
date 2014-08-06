var Deck = require('./deck');

var NUM_START_CARDS = 12;

var Game = function() {

	this.players = [];
	this.activeCards = [];
	this.deck = new Deck();

	this.deal = function(num) {
		var dealt = this.deck.deal(num);
		this.activeCards = dealt.concat(this.activeCards);
		return dealt;
	};

	this.isOver = function() {
		// TODO: Check for sets in activeCards
		return this.deck.cards < 3;
	};

	this.addPlayer = function(player) {
		return this.players.push(player);
	};

	this.remove = function(card) {
		console.log('Removing ' + JSON.stringify(card));
		var activeLen = this.activeCards.length;
		for (var i = 0; i < activeLen; i++) {
			console.log('Comparing card to ' + JSON.stringify(this.activeCards[i]));
			if (JSON.stringify(this.activeCards[i]) === JSON.stringify(card)) {
				this.activeCards.splice(i, 1);
				break;
			}
		}
	};

	// Removes all cards in the input argument from the active cards
	this.removeAll = function(cards) {
		var cardsLen = cards.length;
		for (var i = 0; i < cardsLen; i++) {
			this.remove(cards[i]);
		}
	};

	this.getPlayerById = function(id) {
		var playersLen = this.players.length;
		for (var i = 0; i < playersLen; i++) {
			if (this.players[i].getId() === id) {
				return this.players[i];
			}
		}
		throw new Error('Could not find player with id ' + id);

	}
}

module.exports = function () {
	var instance = new Game();

	instance.deal(NUM_START_CARDS);

	return instance;
};