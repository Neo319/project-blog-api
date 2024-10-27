require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 2000;

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");

const app = express();

//parsing json payloads
app.use(express.json());

// custom middlware: ensuring requests from local machine are allowed
app.use(function setCors(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  next();
});

//middleware: parse url-encoded requests (for login forms, etc.)
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.use("/api", indexRouter);
app.use("/api/posts", postsRouter);

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
