//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");

// Set the express app
const app = express();

//Serve static files
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// const handleRequest = (req, res) => {
//   res.send("Hello World!");
// };

//Declaring the route that sends the user to index.html page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Declaring the route that sends the user to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  //fs.readFile("./db/db.json");
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Create new note with message to db.json file
app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), function (error, response) {
    if (error) {
      console.log(error);
    }
    const notes = JSON.parse(response);
    const noteRequest = req.body;
    const newNoteId = notes.length + 1;
    const newNote = {
      id: newNoteId,
      title: noteRequest.title,
      text: noteRequest.text,
    };
    notes.push(newNote);
    res.json(newNote);
    fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(notes, null, 2),
      function (err) {
        if (err) throw err;
      }
    );
  });
});

//Delete the note with requested id from db.json file
app.delete("/api/notes/:id", function (req, res) {
  const deleteId = req.params.id;
  fs.readFile("/db/db.json", "utf8", function (error, response) {
    if (error) {
      console.log(error);
    }
    
//Listener
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
