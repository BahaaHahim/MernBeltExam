const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    option: String
},{
    timestamps: true
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;