require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 2000;

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");

const cors = require("cors");

const app = express();

//parsing json payloads
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Adjust origin if needed
    methods: "POST,GET,OPTIONS",
    allowedHeaders: "Content-Type",
  })
);

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
