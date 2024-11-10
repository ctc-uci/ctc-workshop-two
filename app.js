const express = require('express');
const cors = require('cors');

// Example of how to import your created routers into app.js
const uselessRouter = require('./routes/uselessRouter');
const theory1Easy = require('./routes/theory1Easy');
// eslint-disable-next-line import/extensions
const theory1Medium = require('./routes/theory1Medium');
// eslint-disable-next-line import/extensions
const theory1Hard = require('./routes/theory1Hard');
// eslint-disable-next-line import/extensions
const theory2Easy = require('./routes/theory2Easy');
// eslint-disable-next-line import/extensions
const theory2Medium = require('./routes/theory2Medium');
// eslint-disable-next-line import/extensions
const theory2Hard = require('./routes/theory2Hard');
// eslint-disable-next-line import/extensions
const theory3Easy = require('./routes/theory3Easy');
// eslint-disable-next-line import/extensions
const theory3Medium = require('./routes/theory3Medium');
// eslint-disable-next-line import/extensions
const theory3Hard = require('./routes/theory3Hard');

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
app.use('/theory1easy', theory1Easy);
app.use('/theory1med', theory1Medium);
app.use('/theory1hard', theory1Hard);
app.use('/theory2easy', theory2Easy);
app.use('/theory2med', theory2Medium);
app.use('/theory2hard', theory2Hard);
app.use('/theory3easy', theory3Easy);
app.use('/theory3med', theory3Medium);
app.use('/theory3hard', theory3Hard);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
