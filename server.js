const express = require('express');

const notes = require('./data/notes.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/notes', (req, res) => {
    // return notes.html
  });

  app.get('*', (req, res) => {
    // return index.html
  })

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

