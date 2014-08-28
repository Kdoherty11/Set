var Card = function(shape, num, color, fill) {
	this.shape = shape;
	this.num = num;
	this.color = color;
	this.fill = fill; 

	this.equals = function(that) {
		return typeof that !== 'undefined' &&
		that !== null &&
		this.shape === that.shape &&
		this.num === that.num &&
		this.color === that.color &&
		this.fill === that.fill;
	};
}

module.exports = Card;

