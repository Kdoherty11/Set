var Entry = require('./entry');

var Leaderboard = function() {

	this.entries = [];

	this.indexOfEntryByName = function(name) {
		var entriesLen = this.entries.length;
		for (var i = 0; i < entriesLen; i++) {
			if (this.entries[i].name === name) {
				return i;
			}
		}
		return -1;
	};

	this.addEntryAscending = function(name, score) {
		this.addEntry(name, score, function(a, b) {
			return a > b;
		});
	}

	this.addEntryDescending = function(name, score) {
		this.addEntry(name, score, function(a, b) {
			return b > a;
		});
	}

	this.addEntry = function(name, score, compare) {
		// Ensures only one entry per user
		var index = this.indexOfEntryByName(name);
		if (index !== -1) {
			if (!compare(this.entries[index].score, score)) {
				return;
			}
			this.entries.splice(index, 1);
		}
		var entry = new Entry(name, score);
		var entriesLen = this.entries.length;
		for (var i = 0; i < entriesLen; i++) {
			if (compare(this.entries[i].score, score)) {
				this.entries.splice(i, 0, entry);
				return;
			}
		}
		this.entries.push(entry);
	};
};

module.exports = Leaderboard;