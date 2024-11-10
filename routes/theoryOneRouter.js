const express = require('express');

const theoryOneRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theoryOneRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
theoryOneRouter.get('/easy', async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT description FROM theories
      WHERE title = 'There is a CTC to FAANG pipeline';
    `);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryOneRouter.get('/medium', async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT avg(believability_score) as avg_bel
      FROM believability;
    `);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryOneRouter.get('/hard', async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT avg(believability_score) FROM believability
      JOIN theories ON believability.theory_id = theories.id
      WHERE theories.title = 'There is a CTC to FAANG pipeline';
    `);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = theoryOneRouter;
