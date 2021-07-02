const express = require('express');

const notes = require('./data/notes.json');

const app = express();

app.get('/notes', (req, res) => {
    // return notes.html
  });

  app.get('*', (req, res) => {
    // return index.html
  })

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});

