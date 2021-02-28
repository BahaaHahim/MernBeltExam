'use strict';

const Poll = require('../models/poll.model.js')
const Vote = require('../models/vote.model.js')

const utils = require('../utils/writer.js');

/**
 * Add a new poll to the server
 *
 * body Poll Poll object that needs to be added to the server
 * no response value expected for this operation
 **/
exports.addPoll = (body) => {
  return new Promise( (resolve, reject) => {
    Poll.exists({question: body.question})
    .then(pollExists => {
        if (pollExists) {
          reject(utils.respondWithCode(409, "Conflict"));
        } else {
          Poll.create(body).then(resolve).catch(reject);
        }
    }).catch(reject);
  });
}

/**
 * Get the list of polls from the server
 *
 * status String Status values that need to be considered for filter (optional)
 * returns List
 **/
exports.getPolls = (status) => {
  if (status == "top3")
    return Poll.aggregate([
      {$sort:{number_of_votes:-1}},
      {$limit: 3}
    ]);
  else
    return Poll.find().sort({'createdAt': -1});
}

/**
 * Find poll by ID
 * Returns a single poll
 *
 * pollId String ID of poll to return
 * returns Poll
 **/
exports.getPollById = (pollId) => {
  return Poll.findById(pollId);
}

/**
 * Adds a vote for a certain poll
 * Adds a vote for the poll identified by ID
 *
 * body Vote Vote object
 * pollId String ID of poll that need to be updated
 * no response value expected for this operation
 **/
exports.vote = (body, pollId) => {
  return new Promise( (resolve, reject) => {
    Poll.findById(pollId).then( (poll) => {
      if (poll) {
        Vote.create(body).then( (vote) => {
          poll.votes.push(vote);
          poll.number_of_votes += 1;
          poll.save().then(resolve).catch(reject);
        }).catch(reject);
      } else {
        reject(404);
      }
    }).catch(reject);
  });
}

