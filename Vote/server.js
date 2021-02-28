const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/poll.routes.js')(app);

mongoose.connect('mongodb://localhost/votingDojo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    const port = 8000;
    app.listen(port, () => {
        console.log('Your server is listening on port %d (http://localhost:%d)', port, port);
    });
}).catch( (error) => {
    console.log('Something went wrong with the database connection', error);
});
