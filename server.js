require('dotenv').config();
require('./services/mongoDB.js');
const generalResponse = require('./utils/response.js');
const httpCodes = require('./utils/httpCodes.js');
const { color, log } = require('console-log-colors');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const allRoutes = require('./routes/api/router.js');
const seedSuperAdmin = require("./seedSuperAdmin.js");


app.use(cors('*'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/public', express.static(path.join(__dirname, 'public')));

// // API routes
app.use(allRoutes);

app.get('/welcome', async (req, res) => {
  res.json('this is welcome message')
});

const port = process.env.PORT || 5013;
app.listen(port, () => {
  log(color.yellow(' ******************************************** '));
  log(color.yellow(' *******                              ******* '));
  log(color.yellow(` *******  Server started at ${port}     ******* `));
  log(color.yellow(' *******                              ******* '));
  log(color.yellow(' ******************************************** '));
});

module.exports = app;