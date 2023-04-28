require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");
  const user = await db.collection("users").findOne({ _id: userId });
  res.status(200).json({ status: 200, data: user });
  console.log(user);
  client.close;
};

module.exports = { getUser };
