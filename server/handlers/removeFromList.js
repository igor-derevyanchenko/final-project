require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  usenewurlparser: true,
  useunifiedtopology: true,
};

const removeFromList = async (req, res) => {
  const { userId } = req.params;
  const { animeId } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");

  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: userId },
      { $pull: { list: { animeId } } },
      { returnDocument: "after" }
    );

  res.status(200).json({ status: 200, data: user.value.list });
  client.close();
};

module.exports = { removeFromList };
