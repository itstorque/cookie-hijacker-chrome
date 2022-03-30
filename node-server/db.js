const { Pool } = require('pg');

const credentials = {
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
}

const pool = new Pool(credentials);

const resetDatabase = (request, response) => {
    pool.query('DROP TABLE IF EXISTS bugs;', (error, results) => {
        if (error) {
            throw error
        }
    })

    const createDatabaseString = `
    CREATE TABLE IF NOT EXISTS "bugs" (
	    "id" SERIAL,
        "timestamp_col" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	    "bug" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

    pool.query(createDatabaseString, [], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Cleared Database!`)
    })
}

const createBug = (request, response) => {
    const bug = request.params.bug;
    pool.query('INSERT INTO bugs (bug, timestamp_col) VALUES ($1, $2)', [bug, new Date()], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Bug added: ${bug}`) // TODO: Remove this later
    })
}

const getAllBugs = (request, response) => {
    pool.query('SELECT * FROM bugs', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



module.exports = { createBug, getAllBugs, resetDatabase };
