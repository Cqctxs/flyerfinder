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
    store: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    coordinates: {
        type: Object,
        required: true
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);