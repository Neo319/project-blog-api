require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 2000;
const indexRouter = require("./routes/index");

const app = express();

//parsing json payloads
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.use("/api", indexRouter);

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
