const request = require('request');
const { spawn } = require('child_process');
const test = require('tape');

const child = spawn('node', ['index.js']);

test('ensure it responds to requests', (t) => {
  t.plan(1);
  child.stdout.on('data', () => {
    request('http://127.0.0.1:5000', (error, response, body) => {
      child.kill();
      t.false(error);
      t.equal(response.statusCode, 200);
      t.notEqual(body.indexOf('welcome to "Heroku NodeJS API" v1'), -1);
    });
  });
});
