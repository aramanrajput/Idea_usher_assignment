const express = require("express");
const app = express();
require('dotenv').config();
const { connect } = require("./src/Config/db");
const PostController = require("./src/Controllers/Post.controller");
const port = process.env.PORT || 8000

app.use(express.json());

app.use("/post", PostController);
connect()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err, "connection error");
  });

app.listen(port, () => {
  console.log("Server started on port 8000");
});
