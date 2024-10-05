const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flyerSchema = new Schema({
    seller: {
        type: Object,
        required: true,
    },
    flyer: {
        type: Object,
        required: true,
    },
    validUntil: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Flyer", flyerSchema);
