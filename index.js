//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set the express app
const app = express();
const PORT = process.env.PORT || 3000;

const handleRequest = (req, res) => {
  res.send("Hello World!");
};

//Declaring the route that sends the user to index.html page
app.get("/", function (req, res) {
  res.send(path.join(__dirname, "public/index.html"));
});

//Declaring the route that sends the user to notes page
app.get("/notes", (req, res) => {
  res.send(path.join(__dirname, "public/notes.html"));
});

app.get("/", (req, res) => {
  res.send("Start working with Note taker");
});

//Create new note with message to db.json file
app.post("/api/notes", function (req, res) {
  fs.readFile(
    path.join("db.json", function (error, response) {
      if (error) {
        console.log(error);
      }
    })
  );
});
//Listener
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
