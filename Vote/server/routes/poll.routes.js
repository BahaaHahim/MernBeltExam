const PollController = require('../controllers/poll.controller.js')

module.exports = function (app) {
    console.log('Setting up routes...');
    app.get('/api', (request, response, next) => {
        return response.json({
            "status": "ok"
        });
    });
    app.get('/api/polls', PollController.getPolls);
    app.post('/api/polls', PollController.addPoll);
    app.get('/api/poll/:pollId', PollController.getPollById);
    app.post('/api/poll/:pollId/vote', PollController.vote);
}