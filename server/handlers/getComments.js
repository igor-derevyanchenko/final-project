require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getComments = async (req, res) => {
  const { animeId } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");
  const result = await db.collection("anime").findOne({ id: animeId });

  if (!result) {
    res.status(200).json({ status: 200, message: "No comments found" });
    client.close();
    return;
  }

  res.status(200).json({ status: 200, data: result.comments });
  client.close();
};

module.exports = { getComments };
