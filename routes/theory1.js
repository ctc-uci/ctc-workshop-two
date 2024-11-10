/* eslint-disable camelcase */
const express = require('express');

const theory1router = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theory1router.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
theory1router.get('/easy', async (req, res) => {
  try {
    // SELECT *
    // FROM theories
    // WHERE title = 'There is a CTC to FAANG pipeline';
    const events = await pool.query(
      "SELECT * FROM theories WHERE title = 'There is a CTC to FAANG pipeline';",
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theory1router.get('/medium', async (req, res) => {
  try {
    const events = await pool.query('SELECT AVG(believability_score) FROM believability;');
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theory1router.get('/hard', async (req, res) => {
  try {
    const events = await pool.query(
      "SELECT believability_score FROM believability AS b JOIN theories AS t ON t.id = b.id WHERE t.title = 'There is a CTC to FAANG pipeline';",
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = theory1router;
