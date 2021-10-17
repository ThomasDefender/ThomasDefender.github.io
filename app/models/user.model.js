const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    url: String,
    avatar_url: String, 
});

module.exports = mongoose.model('User', UserSchema);