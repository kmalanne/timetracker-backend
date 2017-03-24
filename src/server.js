process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const db = require('./db/db');
const app = require('./app/app');

const database = db();
const server = app();

server.listen(PORT, () => console.log(`Express server running in port ${PORT}`));

module.exports = {
  database,
  server,
};
