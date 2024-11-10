/* eslint-disable camelcase */
const express = require('express');

const theoryTwoRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theoryTwoRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
theoryTwoRouter.get('/', async (req, res) => {
  try {
    const events = await pool.query(`SELECT * from theories 
        WHERE title = 'Kevin has a crippling league addiction';`);
    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = theoryTwoRouter;
