const cron = require("node-cron");
const userModel = require("../models/userModel.js");
const matchController = require("../controllers/match.js");
const featureModel = require("../models/featureModel.js");
const db = require("../db/connect.js");

const fileName = "[find-connection]";

const cronJobFN = async () => {
  const prefix = `${fileName} ${Math.floor(Math.random() * 899999 + 100000)}`;

  try {
    console.log(`${prefix} job started`);

    const feature = await featureModel.findOne();
    if (!feature) {
      return;
    }
    const aiRequestFF = feature.aiRequest;

    console.log(`${prefix} aiRequestFF: ${aiRequestFF}`);

    const cursor = userModel
      .find({
        isDeleted: false,
        isAdmin: false,
        "state.isApproved": true,
      })
      .cursor({ batchSize: 10 });
    for await (const user of cursor) {
      await matchController.runMatchingRound(user, { prefix });
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

    cron.schedule("0 * * * *", () => {
      // 0 * * * * - every hour
      console.log(`${fileName} executed at: `, new Date().toLocaleString());
      cronJobFN();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
