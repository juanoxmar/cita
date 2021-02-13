/* eslint-disable no-console */
const express = require('express');

const router = require('./router');
const db = require('./database');

const app = express();
const { PORT } = process.env;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`✨ Listening on PORT: ${PORT} ✨`);
});
