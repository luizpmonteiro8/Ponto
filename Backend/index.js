const express = require('express');
const app = express();
const db = require('./config/db');
const consign = require('consign');

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/controllers')
  .then('./api/services')
  .then('./config/routes.js')
  .into(app);

app.db = db;

app.listen(8080, () => {
  console.log('Backend executando...');
});
