# Take a Note
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
I've created a note-taking app that allows users to create and delete notes to help them remember tasks and other pieces of information (for me, chocolate is a must on my shopping list). Given starter code that formed the baseline functionality of the application, I created server connections that let users create and save new notes and delete and read existing notes.

This application was the first time I'd ever worked with Express. While I'm still trying to understand all of the different processes that make up the backend server side of software development, the process of debugging the application to get it to run successfully has helped demonstrate the importance of servers, especially the importance of placing code in the correct order.

Link to live application: https://take-a-note-now.herokuapp.com/

![Note demonstration using a gif](./public/assets/images/Note%20App.gif)

## Installation
1. Copy the SSH key in my GitHub repo and paste `git clone <SSHKEY>` in your terminal to create a local copy on your computer\
OR
2. Download the zip file and manually copy the files to your computer
3. Install node files by copying and pasting the code `npm init -y` into your terminal
4. You may need to run `npm i` to get the additional JSON files

## Usage
1. Open the link to the application in Heroku
2. Click the "Get Started" button on the home page 
3. Click inside the note title and note body sections to create a new note
4. Click the save icon at the top of the page. You'll now see the note title on the left.
5. Click on the note title on the left to reopen the note in the main section\
OR 
6. Click on the trashcan icon to delete the note instead 
7. Click on the '+' icon at the top to create a new note 

## Credits 
This app uses Heroku for deployment.

- Bootcamp tutor Dru Sanchez fixed my code by moving the app.get request for the home page right above the app.listen(PORT) method.
- TA Ian Darland helped me rename my parameters to get the delete button functionality working.

## License
MIT License