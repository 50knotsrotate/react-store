require('dotenv').config();
const { PORT } = process.env || 4000;

const morgan = require('morgan');
// Might not need axios, but I will leave it here just in case I do.
const axios = require('axios');

const express = require('express');

const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
})