/* eslint-disable camelcase */
const express = require('express');

const theoryTwoRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theoryTwoRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
theoryTwoRouter.get('/easy', async (req, res) => {
  try {
    const events = await pool.query(`SELECT * from evidence WHERE theory_id = 2;`);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryTwoRouter.get('/medium', async (req, res) => {
  try {
    const events = await pool.query(`SELECT COUNT(id) from evidence WHERE theory_id = 2;`);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

theoryTwoRouter.get('/hard', async (req, res) => {
  try {
    const events = await pool.query(
      `SELECT theories.title FROM theories
      JOIN believability ON theories.id = believability.theory_id
      GROUP BY theories.id, theories.title
      ORDER BY AVG(believability.believability_score)
      ASC LIMIT 1`,
    );
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = theoryTwoRouter;
