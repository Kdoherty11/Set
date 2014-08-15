var Set = function(a, b, c) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.sameColors = function() {
		var aColor = this.a.color;
		return aColor === this.b.color && aColor === this.c.color;
	};

	this.sameShapes = function() {
		var aShape = this.a.shape;
		return aShape === this.b.shape && aShape === this.c.shape;
	};

	this.sameNumbers = function() {
		var aNum = this.a.num;
		return aNum === this.b.num && aNum === this.c.num;
	};

	this.sameFills = function() {
		var aFill = this.a.fill;
		return aFill === this.b.fill && aFill === this.c.fill;
	};

	this.diffColors = function() {
		var aColor = this.a.color;
		var bColor = this.b.color;
		var cColor = this.c.color;
		return aColor !== bColor && aColor !== cColor && bColor !== cColor;
	};

	this.diffShapes = function() {
		var aShape = this.a.shape;
		var bShape = this.b.shape;
		var cShape = this.c.shape;
		return aShape !== bShape && aShape !== cShape && bShape !== cShape;
	};

	this.diffNumbers = function() {
		var aNum = this.a.num;
		var bNum = this.b.num;
		var cNum = this.c.num;
		return aNum !== bNum && aNum !== cNum && bNum !== cNum;
	};

	this.diffFills = function() {
		var aFill = this.a.fill;
		var bFill = this.b.fill;
		var cFill = this.c.fill;
		return aFill !== bFill && aFill !== cFill && bFill !== cFill;
	};

	this.isSet = function() {
		return (this.sameColors() || this.diffColors())
				&& (this.sameShapes() || this.diffShapes())
				&& (this.sameNumbers() || this.diffNumbers())
				&& (this.sameFills() || this.diffFills());
	};
}

module.exports = Set;