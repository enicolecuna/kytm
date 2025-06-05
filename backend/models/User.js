const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone:Number,
    email: {type: String, unique: true},
   password: {type: String, required: true},
   role:{type: String, enum: ['admin', 'user'], default: 'user'},
});
const User = mongoose.model('User', userSchema);
module.exports = User;