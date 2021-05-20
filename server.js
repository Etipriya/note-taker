//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");

// Set the express app
const app = express();

//Serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
  console.log(req.body);
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
  console.log(req.params.id);
  const deleteId = req.params.id;
  fs.readFile(
    path.join(__dirname, "/db/db.json"),
    "utf8",
    function (error, response) {
      if (error) {
        console.log(error);
      }
      let notes = JSON.parse(response);
      if (deleteId <= notes.length) {
        // Method to remove an element from an array
        res.json(notes.splice(deleteId - 1, 1));
        // Reassign the ids of all notes
        for (let i = 0; i < notes.length; i++) {
          notes[i].id = i + 1;
        }
        fs.writeFile(
          path.join(__dirname, "/db/db.json"),
          JSON.stringify(notes, null, 2),
          function (err) {
            if (err) throw err;
          }
        );
      } else {
        res.json(false);
      }
    }
  );
});

//Listener
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
