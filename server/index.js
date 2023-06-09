"use strict";
const { getUser } = require("./handlers/getUser");
const { getComments } = require("./handlers/getComments");
const { postComment } = require("./handlers/postComment");
const { addToList } = require("./handlers/addToList");
const { removeFromList } = require("./handlers/removeFromList");
const { editStatus } = require("./handlers/editStatus");
const { editRating } = require("./handlers/editRating");
const { editComment } = require("./handlers/editComment");
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

app.get("/api/get-user/:userId", getUser);
app.get("/api/:animeId/get-comments", getComments);
app.post("/api/:animeId/post-comment", postComment);
app.post("/api/:userId/add-to-list", addToList);
app.post("/api/:userId/remove-from-list", removeFromList);
app.patch("/api/:userId/:animeId/edit-status", editStatus);
app.patch("/api/:animeId/:commentId/edit-comment", editComment);
app.patch("/api/:userId/:animeId/edit-rating", editRating);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
