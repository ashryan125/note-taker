const express = require('express');
const fs = require('fs');
const path = require('path');

const { notes } = require('./data/notes.json');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return finished code to post route for response
    return body;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}



app.get('/notes', (req, res) => {
    res.json(notes);
});

app.get('*', (req, res) => {
// return index.html
});

app.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

   // if any data in req.body is incorrect, send 400 error back
   if (!validateNote(req.body)) {
       res.status(400).send('The note is not properly formatted.');
   } else {
       const note = createNewNote(req.body, notes);
       res.json(note);
   }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

