/* eslint-disable camelcase */
const express = require('express');

const uselessRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

uselessRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
uselessRouter.get('/easy', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT evidence_text' +
        'FROM evidence AS e' +
        'JOIN theories AS t ON e.id = t.id' +
        "WHERE title = 'Kevin has a crippling league addiction';",
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
uselessRouter.get('/medium', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT COUNT(evidence_text)' +
        'FROM evidence AS e' +
        'JOIN theories AS t ON e.id = t.id' +
        "WHERE title = 'Kevin has a crippling league addiction';",
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
uselessRouter.get('/hard', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT MIN(b) FROM (SELECT AVG(believability_score) as b FROM believability);',
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = uselessRouter;
