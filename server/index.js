require("dotenv").config();

const { purchase } = require('./controllers/stripe');

const { NODE_MAILER_USERNAME, NODE_MAILER_PASS } = process.env;

const PORT = process.env.PORT || 4000;

// Init the database
const db = require("./db/client");

db.connect(
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017"
    : "other thing"
);

// Might not need axios, but I will leave it here just in case I do.
const axios = require("axios");

const session = require("express-session");

const { signin, signup, logout } = require("./controllers/auth");

const nodeMailer = require("./controllers/nodeMailer");

const express = require("express");

const app = express();

nodeMailer.init(NODE_MAILER_USERNAME, NODE_MAILER_PASS);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: 100000 //Kind of arbitrary, will put more thought into this later
  })
);

app.use(express.static('public'))

app.use(express.json());

app.post("/signup", signup);

app.post("/signin", signin);

app.post("/logout", logout);

app.post('/purchase', purchase)

app.get('/', function (req, res) {
  console.log('Hello from app')
 })

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

//Error handler
app.use(function(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  res.status(500).json({
    error,
    statusCode
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
