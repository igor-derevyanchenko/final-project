require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient, ObjectId } = require("mongodb");

const options = {
  usenewurlparser: true,
  useunifiedtopology: true,
};

const editComment = async (req, res) => {
  const { animeId, commentId } = req.params;
  const { comment } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");

  await db
    .collection("anime")
    .findOneAndUpdate(
      { id: animeId, "comments._id": new ObjectId(commentId) },
      { $set: { "comments.$.comment": comment } },
      { upsert: true, returnDocument: "after" }
    );

  res.status(200).json({ status: 200 });
  client.close();
};

module.exports = { editComment };
