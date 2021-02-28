const mongoose = require('mongoose');
const Vote = require('./vote.model.js')

function arrayLimit(val) {
    return val.length >= 2;
}

const PollSchema = new mongoose.Schema({
    question : { type: String, required: [true, "Question is required"], minlength: [10, "Question must be at least 10 characters long"] },
    options: { type: [String], validate: [arrayLimit, 'There should be at least 2 options'] },
    votes: { type: [Vote.schema], required: true },
    number_of_votes: { type: Number, required: true },
    status : { type: String, required: false }
}, {
    timestamps: true
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;