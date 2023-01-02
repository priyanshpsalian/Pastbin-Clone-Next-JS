const faunadb = require('faunadb');

const FaunaSecret = process.env.FAUNADB_SECRET_KEY;
const client = new faunadb.Client({ secret: FaunaSecret });
const q = faunadb.query;

module.exports = {
  client,
  q,
  FaunaSecret
};
