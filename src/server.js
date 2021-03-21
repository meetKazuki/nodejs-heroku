const { Client } = require('pg');
const { config } = require('dotenv');
const http = require('http');
const app = require('./app');
const logger = require('./config/logger');

config();

const PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 5000;

const server = http.createServer(app, (request, response) => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  client
    .connect()
    .then(() => client.query('SELECT * FROM hellotable'))
    .then((result) => {
      response.end(`${result.rows[0].name}\n`);
      client.end();
    })
    .catch(() => {
      response.end('error');
      client.end();
    });
});

server.listen(PORT, () => logger.info(`server running on http://localhost:${PORT}`));
