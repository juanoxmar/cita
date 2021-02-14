/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const router = require('./router');
const db = require('./database');

const app = express();
const { PORT } = process.env;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`✨ Listening on PORT: ${PORT} ✨`);
});
