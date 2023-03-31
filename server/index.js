"use strict";

require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");

app.use(morgan("tiny"));

app.get("/api", async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("final-project");
  const bacon = await db.collection("bacon").findOne({ bacon: "bacon" });
  res.status(200).json(bacon);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
