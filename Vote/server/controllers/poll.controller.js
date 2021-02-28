'use strict';

var utils = require('../utils/writer.js');
var Poll = require('../service/poll.service.js');

module.exports.addPoll = function addPoll (req, res, next) {
  const body = req.body;
  Poll.addPoll(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPollById = function getPollById (req, res, next) {
  const pollId = req.params.pollId;
  Poll.getPollById(pollId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPolls = function getPolls (req, res, next) {
  const status = req.query.status;
  Poll.getPolls(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.vote = function vote (req, res, next) {
  const pollId = req.params.pollId;
  const body = req.body;
  Poll.vote(body, pollId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
