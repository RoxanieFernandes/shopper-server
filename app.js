const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3333;

const db = require("./src/models/db.js");

app.get("/", async (req, res) => {
  res.send("Página Inicial");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
