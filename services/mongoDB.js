const mongoose = require('mongoose');
const { color, log } = require('console-log-colors');
require('dotenv').config();

mongoose.set('strictQuery', false);

const mongoUrl = process.env.mongoUrl;


mongoose.connect(mongoUrl)
  .then(() => {
    log(color.cyan(' ******************************************** '));
    log(color.cyan(' *******                              ******* '));
    log(color.cyan(' ******* Mongo Connected successfully ******* '));
    log(color.cyan(' *******                              ******* '));
    log(color.cyan(' ******************************************** '));
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
