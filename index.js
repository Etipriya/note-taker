const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const handleRequest = (req, res) => {
  res.send("Hello World!");
};
app.get("/", handleRequest);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
