const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const createBug = (request, response) => {
    const bug = request.params.bug;
    pool.query('INSERT INTO bugs (bug) VALUES ($1)', [bug], (error, results) => {
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

module.exports = { createBug, getAllBugs };
