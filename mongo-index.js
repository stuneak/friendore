const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function createIndexes() {
  const db = client.db("prod"); // Replace 'myDatabase' with your database name

  console.log("Creating indexes...");
  try {
    /// USERS INDEXES
    const userCollection = db.collection("users");
    await userCollection.createIndex({
      isDeleted: 1,
      isAdmin: 1,
      "state.isApproved": 1,
      isAgreedToReceiveEmail: 1,
    });

    await userCollection.createIndex({
      isDeleted: 1,
      isAdmin: 1,
    });

    await userCollection.createIndex({
      isDeleted: 1,
      isAdmin: 1,
      "state.isApproved": 1,
      "state.isChanged": 1,
    });

    await userCollection.createIndex({
      matched_users: 1,
    });

    /// MATCHES INDEXES
    const matchesCollection = db.collection("matches");

    await matchesCollection.createIndex({
      friends_expiration_date: 1,
      "users.$**": 1,
    });

    await matchesCollection.createIndex({
      expiration_date: 1,
      "users.$**": 1,
      friends_expiration_date: 1,
    });
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}

async function applyMongoIndex() {
  try {
    console.log("index rollout is ready");

    await client.connect();
    await createIndexes();
    console.log("Indexes created successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = { applyMongoIndex };
