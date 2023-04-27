"use strict";
const { getComments } = require("./handlers/getComments");
const { postComment } = require("./handlers/postComment");
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const malProxy = createProxyMiddleware("/mal", {
  target: "https://api.myanimelist.net/v2/",
  changeOrigin: true,
  pathRewrite: {
    "^/mal": "",
  },
});

app.use(express.json());
app.use(morgan("tiny"));
app.use(malProxy);

app.get("/api/:animeId/get-comments", getComments);
app.post("/api/:animeId/post-comment", postComment);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
