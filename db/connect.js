const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log(`Initializing db connection`);
    console.log("Db connection ready");
    return mongoose.connection;
  },
  (err) => {
    console.log("mongoose unable to connect alert");
    console.log("Error while attempting to connect to db:", err);
    process.exit(1);
  }
);

module.exports = db;
