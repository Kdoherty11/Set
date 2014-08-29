var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Leaderboard schema and model
var leaderboardSchema = new Schema({
    name:  { type: String, required: true },  
    score: { type: Number, required: true },
    mode:  { type: String, required: true },
    key:   { type: Number, required: true }  
});

var leaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);

leaderboardModel.insertEntry = function(playerName, playerScore, mode, key, compare) {
	this.findOne({'name': playerName, 'mode': mode, 'key': key}, function(err, submission) {
		if (err) { 
			console.log(err);
			return;
		}

		// Keep track of whether we made a change (and will then need to save)
		var changed = false;

		if (!submission) {
			// We did not find a previous submission, make a new one
			changed = true;	
			submission = new leaderboardModel({
				'name': playerName,
				'score': playerScore,
				'mode': mode,
				'key' : key
			});
		}
		else {
			// We found a previous submission, check previous score
			if (compare(submission.score, playerScore)) {
				changed = true;		
				submission.score = playerScore;		
			}
		}

		// Make the save if we have changes
		if (changed) {
			submission.save(function(err) {
				if (err) { 
					console.log(err);
					return;
				}
			});
		}
	});
};

module.exports = leaderboardModel;