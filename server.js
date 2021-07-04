const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serve up static files
app.use(express.static(path.join(__dirname, '/public')));
const { notes } = require('./data/notesData.json');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
 
    // updates json file with new note
    fs.writeFileSync(
        path.join(__dirname, './data/notesData.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return finished code to post route for response
    return notes;
    console.log(notes);
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};


// get requests
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// display data to page
app.get('/api/notes', (req, res) => {
    fs.readFile('./data/notesData.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(notes);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.post('/api/notes', (req, res) => {
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

