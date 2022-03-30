const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'This page is a work in progress! Check back soon!' });
});

app.get('/report-a-bug/:bug', db.createBug);

app.get('/SUPERSECRETDATABASEDEALIO', db.getAllBugs);

app.get('/clear-database', db.clearDatabase);

app.get('/create-database', db.createDatabase);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
