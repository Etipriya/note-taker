//Dependencies
const express = require("express");
const path = require("path");
const fs =require("fs");

// Set the express app
const app = express();
const PORT = process.env.PORT || 3000;

const handleRequest = (req, res) => {
  res.send("Hello World!");
};

//Declaring the route that sends the user to index.html page
app.get("/",function(req, res));{
  res.send(path.join(__dirname, "public/index.html"))
}

app.get("/", (req, res) => {
  res.send("Start working with Note taker");
});

//Listener
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
