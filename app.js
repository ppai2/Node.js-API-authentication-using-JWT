const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to API'
    });
});

app.post('/api/posts', verifytoken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message : 'Post created ...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: 'Prasanna',
        email : 'prasanna@gmail.com'
    } 
    jwt.sign({user}, 'secretkey', {expiresIn : '10s'}, (err, token) => {
        res.json({
            token
        });
    });
});
app.listen(5000, () => console.log('Server started on 5000'));

function verifytoken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next(); 
    } else {
        res.sendStatus(403);
    }
}