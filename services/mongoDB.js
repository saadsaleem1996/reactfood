const mongoose = require('mongoose');
const { color, log } = require('console-log-colors');
require('dotenv').config();
const seedSuperAdmin = require("./../seedSuperAdmin");

mongoose.set('strictQuery', false);

const mongoUrl = process.env.mongoUrl;

console.log("mongo url is", mongoUrl)

mongoose.connection.once("open", async () => {
  console.log("📦 MongoDB connected");
  await seedSuperAdmin();
});


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
