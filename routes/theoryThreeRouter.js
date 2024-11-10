/* eslint-disable camelcase */
const express = require('express');

const theoryThree = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theoryThree.use(express.json());

theoryThree.get('/easy', async (req, res) => {
  try {
    const events = await pool.query('SELECT submitter FROM believability where theory_id=3;');
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryThree.get('/medium', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT submitter FROM believability where theory_id=3 and believability_score >= 5;',
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryThree.get('/hard', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT AVG(believability_score) FROM believability where theory_id=3 and believability_score != 1 and believability_score != 10;',
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = theoryThree;
