require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 2000;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
