const cron = require("node-cron");
const userModel = require("../models/userModel.js");
const featureModel = require("../models/featureModel.js");
const matchModel = require("../models/matchModel.js");
const sendEmail = require("../utils/sendEmail.js");
const db = require("../db/connect.js");
const ObjectId = require("mongodb").ObjectId;

const fileName = "[expiring-connection-email]";

const cronJobFN = async () => {
  const prefix = `${fileName} ${Math.floor(Math.random() * 899999 + 100000)}`;

  try {
    console.log(`${prefix} job started`);

    const feature = await featureModel.findOne();
    if (!feature) {
      return;
    }

    const sendConnectionEmailFF = feature.sendConnectionEmail;

    console.log(`${prefix} sendConnectionEmailFF: ${sendConnectionEmailFF}`);

    if (!sendConnectionEmailFF) {
      return;
    }

    const cursor = userModel
      .find({
        isDeleted: false,
        isAdmin: false,
        "state.isApproved": true,
        isAgreedToReceiveEmail: true,
      })
      .cursor({ batchSize: 10 });

    for await (const user of cursor) {
      const expiringConnections = await matchModel
        .find({
          expiration_date: {
            $lt: new Date(Date.now() + 60 * 60 * 1000 * 24 * 2), // 2 days from now
          },
          [`users.${user._id}.approved`]: false,
          friends_expiration_date: { $exists: false },
          isConnectionEmailSent: false,
        })
        .select("_id");

      const connectionsNumber = expiringConnections.length;

      console.log(
        `${prefix}, email: ${user.email} connectionsNumber: ${connectionsNumber}`
      );

      if (connectionsNumber > 0) {
        void sendEmail.sendExpiringConnectionMessage(user, connectionsNumber);
        await matchModel.updateMany(
          {
            _id: {
              $in: expiringConnections.map((conn) => new ObjectId(conn._id)),
            },
          },
          {
            $set: { isConnectionEmailSent: true },
          }
        );
      }
    }
    console.log(`${prefix} job finished`);
  } catch (error) {
    console.log(`${prefix}, error: ${error}`);
  }
  console.log(`${fileName} completed at: `, new Date().toLocaleString());
};

const start = async () => {
  try {
    await db;
    console.log(`${fileName} started`);
    cron.schedule("0 0 * * *", () => {
      // 0 0 * * * - every day at 00:00
      console.log(`${fileName} executed at: `, new Date().toLocaleString());
      cronJobFN();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
