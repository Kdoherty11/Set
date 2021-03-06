var Deck = require('./deck'),
	Set = require('./set'),
	SetSolver = require('./setSolver');

var NUM_START_CARDS = 12;

var Game = function(id) {

	this.id = id;
	this.players = [];
	this.activeCards = [];
	this.deck = new Deck();
	this.isStarted = false;

	this.deal = function(num) {
		var dealt = this.deck.deal(num);
		this.activeCards = dealt.concat(this.activeCards);
		return dealt;
	};

	this.isOver = function() {
		var solver = new SetSolver();
		return this.deck.cards < 3 && solver.findSet(this.activeCards) === null;
	};

	this.addPlayer = function(player) {
		if (this.getPlayerByName(player.name) === null) {
			this.players.push(player);
		}
	};

	this.removePlayer = function(name) {
		var playersLen = this.players.length;
		for (var i = 0; i < playersLen; i++) {
			if (this.players[i].name === name) {
				this.players.splice(i, 1);
			}
		}
	};

	this.removeCard = function(card) {
		var activeLen = this.activeCards.length;
		for (var i = 0; i < activeLen; i++) {
			if (this.activeCards[i].equals(card)) {
				this.activeCards.splice(i, 1);
				return;
			}
		}
		throw new Error('Cound not remove ' + JSON.stringify(card));
	};

	// Removes all cards in the input argument from the active cards
	this.removeCards = function(cards) {
		var cardsLen = cards.length;
		for (var i = 0; i < cardsLen; i++) {
			this.removeCard(cards[i]);
		}
	};

	this.getPlayerByName = function(name) {
		var playersLen = this.players.length;
		for (var i = 0; i < playersLen; i++) {
			if (this.players[i].name === name) {
				return this.players[i];
			}
		}
		return null;
	};

	this.containsCard = function(card) {
		var activeLen = this.activeCards.length;
		for (var i = 0; i < activeLen; i++) {
			if (this.activeCards[i].equals(card)) {
				return true;
			}
		}
		return false;
	};

	this.containsAllCards = function(cards) {
		var cardsLen = cards.length;
		for (var i = 0; i < cardsLen; i++) {
			if (!this.containsCard(cards[i])) {
				return false;
			}
		}
		return true;
	};

	this.handleSet = function(cards) {
		var numCards = cards.length;
		this.isStarted = true;
		if (numCards === 3 && new Set(cards[0], cards[1], cards[2]).isSet()) {
			if (this.containsAllCards(cards)) {
				this.removeCards(cards);
				if (this.activeCards.length === 9) {
					this.deal(3);
				}
				if (!this.isOver()) {
					while (this.findSet() === null) {
	    				this.deal(3);
					}
				}	
				return "Set!";
			} else {
				return "Too late!";
			}
		} else {
			return "Not a Set!";
		}
	};

	this.findSet = function() {
		var setSolver = new SetSolver();
		return setSolver.findSet(this.activeCards);
	};
};

module.exports = function (id) {
	var instance = new Game(id);

	instance.deal(NUM_START_CARDS);

	while (instance.findSet() === null) {
        instance.deal(3);
    }

	return instance;
};