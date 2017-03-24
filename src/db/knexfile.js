const path = require('path');

// Running migrations from CLI or Travis => localhost
const host = process.env.NODE_ENV === 'test' ? '127.0.0.1' : 'postgres';

const dbConfiguration = {
  client: 'pg',
  connection: `postgres://postgres:postgres@${host}:5432/postgres`,
  migrations: {
    directory: path.join(__dirname, '/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '/seeds'),
  },
  pool: {
    max: 1,
  },
};

module.exports = {
  development: dbConfiguration,
  test: dbConfiguration,
  production: dbConfiguration,
};
