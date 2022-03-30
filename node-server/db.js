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
      "user_ip" VARCHAR(30),
	    "bug" TEXT NOT NULL,
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
    // response.status(201).send(`Bug added: ${request.query.bug}`)
    const bug = request.query.bug;

    const user_ip = req.ip || req.connection.remoteAddress;


    sql.query("SELECT * FROM `bugs` WHERE `user_ip`= " + user_ip "", () => {

      // TODO: check for existing entry and update

    })

    pool.query('INSERT INTO bugs (bug, timestamp_col, user_ip) VALUES ($1, $2, $3)',
                [bug, new Date(), user_ip],

                (error, results) => {

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
