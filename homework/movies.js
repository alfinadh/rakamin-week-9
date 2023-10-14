var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var Pool = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies',
    password: 'abcdefgh',
    port: '5432',
});

const options = {
    definiton: {
        openapi: '3.0.0',
        info: {
            title: 'Homework Week 9',
            version: '0.1.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./movies/*'],
};

const specs = swaggerJsdoc(options);
app.use('/homeworkweek9', swaggerUI.serve, swaggerUI.setup(specs));


router.get('/movies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json('Internal Server Error!');
    }
});

router.post('/movies', async (req, res) => {
    const { title, genre, year} = req.body;
    try {
        const result = await pool.query('INSERT INTO movies (title, genre, year) VALUES ($1, $2, $3) RETURNING*', [title, genre, year]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json('Terjadi Kesalahan');
    }
});

router.put('/movies/:id', async (req, res) => {
    const params = req.body;
    const movies = await movies.findById(id);
    try {
        const result = await pool.query('UPDATE movies SET title = $1, genre = $2, year = $3 WHERE id = $4 RETURNING *' [title, genre, year, moviesId]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json('Terjadi Kesalahan');
    }
});

router.delete('/movies/:id', async (req, res) => {
    const moviesId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [moviesId]);
        res.status(204).json();
    }  catch (err) {
        console.error('Error:', err);
        res.status(500).json('Gagal Menghapus Data');
    }
});

module.exports = router;