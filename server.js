// importing required files
const express = require('express');
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('./Helper/fsHelpers');

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

// GET Route for API Notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post Route for creating API Notes
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  
  const { title, text } = req.body;
  
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    
    //reading db.json file and appending new note to existing content 
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Delete route to delete notes when trashcan icon is clicked
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((data) => data.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});

// Get Route for the notes.html page
app.get('/notes', (req, res) => {
  console.log("hit")
  res.sendFile(path.join(__dirname, '/public/notes.html'))
}
);

// Get Route for the index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
