const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'This page is a work in progress! Check back soon!' });
    // res.json('This page is a work in progress! Check back soon!');
});

app.post('/report-a-bug/:bug', db.createBug);

app.get('/SUPERSECRETDATABASEDEALIO', db.getAllBugs);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
