const express = require('express');
const cors = require('cors');

// Example of how to import your created routers into app.js
const uselessRouter = require('./routes/uselessRouter');
const theory1router = require('./routes/theory1');
const theory2router = require('./routes/theory2');
const theory3router = require('./routes/theory3');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

// Use your routers here (e.g. app.use('/useless', uselessRouter);)
app.use('/useless', uselessRouter);
app.use('/theory1', theory1router);
app.use('/theory2', theory2router);
app.use('/theory3', theory3router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
