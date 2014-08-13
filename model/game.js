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
			if (this.activeCards[i].equals(card)) {
				console.log('Remove Works!');
				this.activeCards.splice(i, 1);
				return;
			}
		}
		throw new Error('Cound not remove ' + JSON.stringify(card));
	};

	// Removes all cards in the input argument from the active cards
	this.removeAll = function(cards) {
		console.log('in removeAll trying to remove: ' + JSON.stringify(cards));
		var cardsLen = cards.length;
		for (var i = 0; i < cardsLen; i++) {
			console.log('Passing ' + cards[i] + ' to remove')
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
		if (this.registrationIds.length === 0) {
			throw new Error('No Ids are registered');
		}
		var apiKey = 'AIzaSyB7cSXPyISGfV9VeDr_T7isoa8SnJSh6XE';
		var sender = new gcm.Sender(apiKey);
		var message = new gcm.Message();
		

		console.log('Sending tickle');
		sender.send(message, this.registrationIds, 4, function (err, result) {
    		console.log('result: ' + result);
    		console.log('result: ' + JSON.stringify(result));
		});
	};
}

module.exports = function (id) {
	var instance = new Game(id);

	instance.deal(NUM_START_CARDS);

	return instance;
};