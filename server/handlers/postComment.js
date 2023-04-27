require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient, ObjectId } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postComment = async (req, res) => {
  const { animeId } = req.params;
  const { email, comment } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");

  const user = await db.collection("users").findOne({ email: email });
  const commenter = user.username ?? user.name;

  const filter = { id: animeId };
  const update = {
    $setOnInsert: { id: animeId },
    $push: { comments: { user: commenter, comment: comment } },
  };
  const dbOptions = { upsert: true };

  const result = await db
    .collection("anime")
    .updateOne(filter, update, dbOptions);

  if (!result) {
    res.status(500).json({ status: 500, message: "Something went wrong" });
    client.close();
    return;
  }
  res.status(200).json({ status: 200, message: "Comment posted" });
  client.close();
};

module.exports = { postComment };
