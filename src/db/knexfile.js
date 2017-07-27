const path = require('path');

// Running migrations from CLI or Travis => localhost
const host = process.env.NODE_ENV === 'test' ? '127.0.0.1' : 'postgres';

const dbConfiguration = {
  client: 'pg',
  connection: {
    host,
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    timezone: '+02:00',
  },
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
