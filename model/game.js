var Deck = require('./deck'),
	SetSolver = require('./setSolver'),
	gcm = require('node-gcm');

var NUM_START_CARDS = 12;

var Game = function(id) {

	this.players = [];
	this.activeCards = [];
	this.registrationIds = [];
	this.deck = new Deck();
	this.id = id;

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
		this.players.push(player);
		this.registrationIds.push(player.regId);
		console.log('RegIds: ' + this.registrationIds);
	};

	this.remove = function(card) {
		var activeLen = this.activeCards.length;
		for (var i = 0; i < activeLen; i++) {
			if (JSON.stringify(this.activeCards[i]) === JSON.stringify(card)) {
				this.activeCards.splice(i, 1);
				break;
			}
		}
	};

	// Removes all cards in the input argument from the active cards
	this.removeAll = function(cards) {
		var cardsLen = cards.length;
		console.log('CardsLen: ' + cardsLen);
		for (var i = 0; i < cardsLen; i++) {
			this.remove(cards[i]);
		}
	};

	this.getPlayerByName = function(name) {
		var playersLen = this.players.length;
		for (var i = 0; i < playersLen; i++) {
			if (this.players[i].name === name) {
				return this.players[i];
			}
		}
		throw new Error('Could not find player with name ' + name);
	};

	this.broadcastSendToSync = function() {
		console.log('In broadcastSendToSync');
		if (this.registrationIds.length === 0) {
			throw new Error('No Ids are registered');
		}
		var message = new gcm.Message();
		var sender = new gcm.Sender('AIzaSyB7cSXPyISGfV9VeDr_T7isoa8SnJSh6XE');

		console.log('Sending tickle');
		sender.send(message, this.registrationIds, 4, function (err, result) {
    		console.log('result: ' + result);
		});
	};
}

module.exports = function (id) {
	var instance = new Game(id);

	instance.deal(NUM_START_CARDS);

	return instance;
};