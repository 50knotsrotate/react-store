require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Init the database
const db = require('./db/client');

db.connect(process.env.NODE_ENV === 'development' ? "mongodb://localhost:27017" : 'other thing');

// const morgan = require('morgan');
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
      cookie: { secure: true },
      maxAge: 100000 //Kind of arbitrary, will put more thought into this later
  })
);

// app.use(morgan('dev'));

app.use(express.json());

app.post('/signup', signup);

app.post('/signin', signin);

app.post('/logout', logout);

app.get('/', (req, res) => { 
    res.status(200).send('Hello')
})

//Error handler
app.use(function (error, req, res, next) { 
    res.status(500).json({
        error
    })
})


app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
})

module.exports = app;

