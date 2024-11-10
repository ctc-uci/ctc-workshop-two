const express = require('express');
const cors = require('cors');

// Example of how to import your created routers into app.js
const uselessRouter = require('./routes/uselessRouter');

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
