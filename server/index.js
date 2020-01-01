require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Init the database
const db = require('./db/client');

db.connect();

const morgan = require('morgan');
// Might not need axios, but I will leave it here just in case I do.
const axios = require('axios');

const session = require('express-session');

const { signin, signup,logout } = require('./controllers/auth');

const express = require('express');

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use(morgan('dev'));

app.use(express.json());

app.post('/signup', signup);

app.post('/signin', signin);

app.post('/logout', logout);


app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
})


