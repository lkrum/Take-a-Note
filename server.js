
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left - hand column with the other existing notes
// WHEN I click on an existing note in the list in the left - hand column
// THEN that note appears in the right - hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right - hand column

// run server first and then start debugging
// event listener not working
// need to check whether hitting the correct routes when hitting correct button
// when clicking save, needs to add note object into array of saved notes in dbjson file

// importing required files
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('./Helper/uuid');

// enabling port in both Heroku and in local server
const PORT = process.env.PORT || 3001;

// initializing express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// Get Route for the notes.html page
app.get('/notes', (req, res) => {
  console.log("hit")
  res.sendFile(path.join(__dirname, '/public/notes.html'))
}
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// GET Route for API Notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post Route for API Notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    //reading db.json file and appending new note to existing content 
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Get Route for the index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
