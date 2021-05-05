// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse env variables
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/bhtech', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Configure middlewares
app.use(cors());
app.use(express.json());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
