const { Model } = require('objection');
const config = require('../knexfile.js');
const knex = require('knex')(config);

knex.migrate.latest([config]);
Model.knex(knex);
module.exports = knex;
