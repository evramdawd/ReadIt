const { Pool } = require('pg');
const { param } = require('../routes/api');

const pool = new Pool({
  host: 'localhost',
  database: 'reddit1',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}