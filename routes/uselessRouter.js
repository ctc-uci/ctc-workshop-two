/* eslint-disable camelcase */
const express = require('express');

const uselessRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

uselessRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
uselessRouter.get('/', async (req, res) => {
  try {
    const events = await pool.query('SELECT * FROM theories;');
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = uselessRouter;
