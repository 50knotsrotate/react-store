require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Init the database
const connect = require('./db/client');

const morgan = require('morgan');
// Might not need axios, but I will leave it here just in case I do.
const axios = require('axios');

const { signin, signup,logout } = require('./controllers/auth');

const express = require('express');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.post('/signup', signup);

app.post('/signin', signin);

app.post('/logout', logout);


app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
})


