const environment = "test";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;
