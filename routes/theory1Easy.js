const express = require('express');

const theory1Easy = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theory1Easy.use(express.json());

theory1Easy.get('/', async (req, res) => {
  try {
    const events = await pool.query(`        
    SELECT description FROM theories
    WHERE title = 'There is a CTC to FAANG pipeline'`);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = theory1Easy;
