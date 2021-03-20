const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'welcome to "Heroku NodeJS API" v1',
}));

app.all('*', (request, response) => response.status(404).json({
  status: 'error',
  error: 'resource not found',
}));

module.exports = app;
