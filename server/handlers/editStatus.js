require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  usenewurlparser: true,
  useunifiedtopology: true,
};

const editStatus = async (req, res) => {
  const { userId, animeId } = req.params;
  const { status } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");

  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: userId, "list.animeId": animeId },
      { $set: { "list.$.status": status } },
      { upsert: true, returnDocument: "after" }
    );

  res.status(200).json({ status: 200, data: user.value.list });
  client.close();
};

module.exports = { editStatus };
