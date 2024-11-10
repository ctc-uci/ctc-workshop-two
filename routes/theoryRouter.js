/* eslint-disable camelcase */
const express = require('express');

const theoryRouter = express.Router();
const pool = require('../server/db');

require('dotenv').config();

theoryRouter.use(express.json());

// Notice how we're using a get (But there's also others like post, put/patch, delete)
theoryRouter.get('/', async (req, res) => {
  try {
    const { id, level } = req.query;
    let result;

    if (id === '1') {
      if (level === 'easy') {
        result = await pool.query(
          "SELECT description FROM theories WHERE title = 'There is a CTC to FAANG pipeline';",
        );
      } else if (level === 'medium') {
        result = await pool.query(
          'SELECT AVG(believability_score) AS believeability_avg FROM believability;',
        );
      } else {
        result = await pool.query(
          "SELECT AVG(believability_score) FROM believability JOIN theories as t on believability.theory_id=t.id WHERE t.title = 'There is a CTC to FAANG pipeline';",
        );
      }
      res.status(200).json(result.rows);
    } else if (id === '2') {
      if (level === 'easy') {
        result = await pool.query(
          "SELECT evidence_text FROM evidence INNER JOIN theories ON evidence.theory_id = theories.id WHERE theories.title = 'Kevin has a crippling league addiction';",
        );
      } else if (level === 'medium') {
        result = await pool.query(
          "SELECT COUNT(*) FROM evidence INNER JOIN theories ON evidence.theory_id = theories.id WHERE theories.title = 'Kevin has a crippling league addiction';",
        );
      } else {
        result = await pool.query(
          'SELECT theory_id, AVG(believability_score) FROM believability GROUP BY(theory_id) ORDER BY avg ASC LIMIT 1;',
        );
      }
      res.status(200).json(result.rows);
    } else if (id === '3') {
      if (level === 'easy') {
        result = await pool.query(
          "SELECT submitter FROM believability INNER JOIN theories ON believability.theory_id = theories.id WHERE theories.title = 'CTC devs will be replaced by AI in the future';",
        );
      } else if (level === 'medium') {
        result = await pool.query(
          "SELECT submitter FROM believability INNER JOIN theories ON believability.theory_id = theories.id WHERE theories.title = 'CTC devs will be replaced by AI in the future' and believability_score >= 5;",
        );
      } else {
        result = await pool.query(
          "SELECT AVG(believability_score) FROM believability INNER JOIN theories ON believability.theory_id = theories.id WHERE theories.title = 'CTC devs will be replaced by AI in the future' and believability_score != 1 and believability_score != 10;",
        );
      }
      res.status(200).json(result.rows);
    } else {
      res.status(500).json('Theory not defined.');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// IMPORTANT: This is how you export your router in order to make it importable in app.js
module.exports = theoryRouter;
