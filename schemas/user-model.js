var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
 
var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
 
UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
        // override the cleartext password with the hashed one  
            user.password = hash;
            next();
        });
    });
});
 
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var userModel = mongoose.model('User', UserSchema);
var User = mongoose.model('User');

userModel.addUser = function(username, password, callback) {
    this.findOne({username: username}, function(err, user) {
        if (err) throw err;
        if (user) {
            callback('Taken');
        } else {
            user = new User({
                username: username,
                password: password
            });
            // save user to database
            user.save(function(err) {
                if (err) throw err;
            });
            callback('OK');
        }
    });
};

userModel.authenticate = function(username, password, callback) {
    this.findOne({ username: username }, function(err, user) {
        if (err) throw err;
        if (user) {
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                callback(isMatch);
            });
        } else {
            callback(false);
        }
    });
};
 
module.exports = userModel;