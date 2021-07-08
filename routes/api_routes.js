const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const { notes } = require("../data/notesData.json");

// display data to page
router.get("/api/notes", (req, res) => {
  fs.readFile("./data/notesData.json", function (err, data) {
    if (err) {
      throw err;
    }
    let notesData = JSON.parse(data);
    res.send(notesData.notes);
  });
  // res.send(notes);
});

router.post("/api/notes", (req, res) => {
  //  change id to random number with NPM Unique ID
  req.body.id = uniqid();

  if (typeof req.body.title !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }
  if (typeof req.body.text !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }

  let newNote = req.body;
  notes.push(newNote);
  fs.writeFile(
    "./data/notesData.json",
    JSON.stringify({ notes: notes }, null, 1),
    (err) => {
      if (err) throw err;
      res.json(newNote);
    }
  );
});


router.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === req.params.id) {
            notes.splice(i, 1);
            break;
        }
    }
    fs.writeFile('./data/notesData.json', JSON.stringify({ notes: notes }, null, 1), (err) => {
        if (err) throw err;
        
    });
    res.json(notes);
});

module.exports = router;
