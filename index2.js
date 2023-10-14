var express = require('express'),
    bodyParser = require ('body-parser'),
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require ('swagger-ui-express');
var jwt = require ('jsonwebtoken');
var app = express();
var morgan = require ('morgan');

app.use(morgan('tiny'));


app.get('/', (req,res) => {
    const token = jwt.sign (
        {
            userID : 1010,
            role : 'admin',
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

app.listen(3000);