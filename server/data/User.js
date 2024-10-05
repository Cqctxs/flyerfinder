const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);