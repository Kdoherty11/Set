var Card = require('./card'),
	_ = require('underscore');

var Deck = function() {
	this.cards = [];

	this.fill = function() {
		var shapes = ['oval', 'diamond', 'squiggle'];
		var numbers  = [1, 2, 3];
		var colors = ['red', 'green', 'purple'];
		var fills = ['solid', 'striped', 'empty'];

		var shapesLen = shapes.length;
		var numbersLen = numbers.length;
		var colorsLen = colors.length;
		var fillsLen = fills.length;

		var shape = null;
		var number = null;
		var color = null;
		var fill = null;

		for (var i = 0; i < shapesLen; i++) {
			shape = shapes[i];
			for (var j = 0; j < numbersLen; j++) {
				number = numbers[j];
				for (var k = 0; k < colorsLen; k++) {
					color = colors[k];
					for (var l = 0; l < fillsLen; l++) {
						fill = fills[l];
						var card = new Card(shape, number, color, fill)
						this.cards.push(card);
					}
				}
			}
		}
	};

	this.shuffle = function() {
		this.cards = _.shuffle(this.cards);
	};

	this.deal = function(num) {
		var dealt = [];
		if (this.cards.length < num) {
			return dealt;
		}
		for (var i = 0; i < num; i++) {
			var card = this.cards[0];
			dealt.push(this.cards.shift())
		}
		return dealt;
	};
}

module.exports = function () {
	var instance = new Deck();

	instance.fill();
	instance.shuffle();

	return instance;
};