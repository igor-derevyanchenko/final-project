require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  usenewurlparser: true,
  useunifiedtopology: true,
};

const editRating = async (req, res) => {
  const { userId, animeId } = req.params;
  const rating = parseInt(req.body.rating);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");

  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: userId, "list.animeId": animeId },
      { $set: { "list.$.rating": rating } },
      { upsert: true, returnDocument: "after" }
    );

  res.status(200).json({ status: 200, data: user.value.list });
  client.close();
};

module.exports = { editRating };
