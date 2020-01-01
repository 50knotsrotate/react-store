require('dotenv').config();
const PORT = process.env.PORT || 4000;

const morgan = require('morgan');
// Might not need axios, but I will leave it here just in case I do.
const axios = require('axios');

const { signin, signup, login,logout } = require('./controllers/auth');

const express = require('express');

const app = express();

app.use(morgan('dev'));

app.post('/signup', signup);

app.post('/signin', signin);

app.post('/login', login);

app.post('/logout', logout);


app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
})


