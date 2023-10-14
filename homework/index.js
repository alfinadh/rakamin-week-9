var express = require ('express');
var bodyParser = require ('body-parser');
var jwt = require('jsonwebtoken');
var swaggerUI = require ('swagger-ui-express');
var swaggerJsdoc = require ('swagger-jsdoc');
var morgan = require('morgan');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var movies = require ('./movies.js');
app.use('/movies', movies);

const users = [];
app.post('/login', (req,res) => {
    const { username, password} = req.body;
    const token = jwt.sign (
        {
            username : '',
            password : 'admin',
        },
        'koderahasia',
        { expiresIn : '30m'}
    );
    res.json({
        token: token,
    });
});

app.get('/verify/:token', (req, res) => {
    const data = jwt.verify(
        req.params.token,
        'koderahasia'
    );
    res.json({
        data: data,
    });
});

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    users.push ({username, password});

    res.status(201).json({message: 'Berhasil Terdaftar'});
});

const app = express();
app.use(morgan('tiny'));

app.get('/index/paginate', (req,res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < model.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: 10,
        };
    }

    results.results = model.slice(startIndex, endIndex);

    res.json(results);
});

app.listen(3000);

