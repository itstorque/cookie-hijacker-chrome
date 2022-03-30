const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    // The next() call tells the middleware to go to the next middleware function if there is one.
    //  This is important to include at the end of our function - otherwise, the request will get stuck on this middleware.
    next();
});

app.get('/', (req, res) => {
    res.send('This page is a work in progress! Check back soon!');
});

app.get('/report-a-bug/:bug', (req, res) => {
    res.send('Thanks for reporting a bug! The \'bug\': ' + req.params.bug); D
});

app.get('/SUPERSECRETDATABASEDEALIO', (req, res) => {
    res.send('This is the secret database dealio!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
