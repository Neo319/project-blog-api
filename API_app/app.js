require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 2000;

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");

const app = express();

//parsing json payloads
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.use("/api", indexRouter);
app.use("/posts", postsRouter);

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
