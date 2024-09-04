const cron = require("node-cron");
const userModel = require("../models/userModel.js");
const featureModel = require("../models/featureModel.js");
const matchModel = require("../models/matchModel.js");
const sendEmail = require("../utils/sendEmail.js");
const db = require("../db/connect.js");
const ObjectId = require("mongodb").ObjectId;

const fileName = "[expiring-friends-email]";

const cronJobFN = async () => {
  const prefix = `${fileName} ${Math.floor(Math.random() * 899999 + 100000)}`;

  try {
    console.log(`${prefix} job started`);

    const feature = await featureModel.findOne();
    if (!feature) {
      return;
    }

    const sendFriendEmailFF = feature.sendFriendEmail;

    console.log(`${prefix} sendFriendEmailFF: ${sendFriendEmailFF}`);

    if (!sendFriendEmailFF) {
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
      const expiringFriends = await matchModel
        .find({
          [`users.${user._id}.approved`]: true,
          friends_expiration_date: {
            $lt: new Date(Date.now() + 60 * 60 * 1000 * 24 * 2), // 2 days from now
          },
          isFriendEmailSent: false,
        })
        .select("_id");

      const friendsNumber = expiringFriends.length;

      console.log(
        `${prefix}, email: ${user.email} connectionsNumber: ${friendsNumber}`
      );

      if (friendsNumber > 0) {
        void sendEmail.sendExpiringFriendMessage(user, friendsNumber);
        await matchModel.updateMany(
          {
            _id: { $in: expiringFriends.map((conn) => new ObjectId(conn._id)) },
          },
          {
            $set: { isFriendEmailSent: true },
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

    cron.schedule("0 13 * * *", () => {
      // 0 13 * * * - every day at 1 PM (13:00)
      console.log(`${fileName} executed at: `, new Date().toLocaleString());
      cronJobFN();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
