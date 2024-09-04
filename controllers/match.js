const matchModel = require("../models/matchModel");
const userModel = require("../models/userModel");
const ai = require("../external/ai");
const ObjectId = require("mongodb").ObjectId;
const { sendMessage } = require("../websocket");
const featureModel = require("../models/featureModel.js");

const inPerson = "in-person";

const approveMatch = async (req, res) => {
  try {
    const { user } = req;
    const { body } = req;

    const match = await matchModel.findOne({
      _id: new ObjectId(body.match_id),
      [`users.${user._id}`]: { $exists: true },
    });

    if (!match) {
      return res
        .status(404)
        .send({ code: "not_found", message: "Match not found" });
    }

    match.users[user._id].approved = true;

    let matchIsApprovedByAll = [];

    if (Object.values(match.users).every((user) => user.approved === true)) {
      match.friends_expiration_date = new Date(
        Date.now() + 24 * 60 * 60 * 1000 * 14
      ); // 14 days
      matchIsApprovedByAll = Object.keys(match.users);
    }

    match.markModified("users");
    match.markModified("friends_expiration_date");
    await match.save();

    if (matchIsApprovedByAll.length === 2) {
      sendMessage(matchIsApprovedByAll[0], { code: "new_friend" });
      sendMessage(matchIsApprovedByAll[1], { code: "new_friend" });
    }

    return res
      .status(200)
      .send({ code: "success", message: "Match is approved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: "match:internal_error", message: error });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const { user } = req;

    const matches = await matchModel.aggregate([
      {
        $match: {
          expiration_date: { $gte: new Date() }, // This uses MongoDB's server time
          [`users.${user._id}.approved`]: false,
          friends_expiration_date: { $exists: false },
        },
      },
    ]);

    matches.sort((a, b) => a.expiration_date - b.expiration_date);

    const otherUserIds = matches
      .map((match) => {
        return Object.keys(match.users).filter(
          (id) => id !== user._id.toString()
        );
      })
      .flat();

    // Fetch all other users' profiles from the User model
    const otherUsers = await userModel
      .find({ _id: { $in: otherUserIds.map((id) => new ObjectId(id)) } })
      .lean();

    // Create a map of other users' profiles for easy lookup
    const otherUsersMap = otherUsers.reduce((acc, userProfile) => {
      acc[userProfile._id] = {
        languages: userProfile.languages,
        communication: userProfile.communication,
        country: userProfile.country,
        year: userProfile.year,
        hobbies: userProfile.hobbies,
        aboutme: userProfile.aboutme,
        goals_dreams: userProfile.goals_dreams,
      };
      return acc;
    }, {});

    // Merge the other user's profile into the matches
    const matchesWithOtherUser = matches.map((match) => {
      const otherUserId = Object.keys(match.users).filter(
        (id) => id !== user._id.toString()
      )[0];
      return {
        _id: match._id,
        score: match.match_score,
        expiration_date: match.expiration_date,
        userProfile: otherUsersMap[otherUserId], // Merge the other user's profile
      };
    });

    const matchesWithoutDeleted = matchesWithOtherUser.filter((match) => {
      if (!match.userProfile) {
        return false;
      }
      return !match.userProfile.isDeleted;
    });

    return res.status(200).send({
      matches: matchesWithoutDeleted,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: "match:internal_error", message: error });
  }
};

function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

// Function to calculate the age difference between two birth years
function calculateAgeDifference(birthYear1, birthYear2) {
  const age1 = calculateAge(birthYear1);
  const age2 = calculateAge(birthYear2);
  return Math.abs(age1 - age2); // Get the absolute value of the difference
}

const runMatchingRound = async (user, { prefix = "" }) => {
  try {
    const feature = await featureModel.findOne();
    const aiRequestFF = feature.aiRequest;

    prefix = `${prefix} userid: ${user.email}`;
    console.log(`${prefix} runMatchingRound started`);

    let processedCount = 0;

    const otherUsersCursor = await userModel
      .find({
        matched_users: { $nin: [user._id] },
        _id: { $ne: new ObjectId(user._id) },
        isDeleted: false,
        isAdmin: false,
        "state.isApproved": true,
      })
      .cursor({ batchSize: 10 });

    for await (const otherUser of otherUsersCursor) {
      console.log(`${prefix} runMatchingRound interate over matches`);
      // languages
      const hasSomeLanguages = user.languages.some((method) =>
        otherUser.languages.includes(method)
      );
      // age difference
      const checkAgeDifference =
        calculateAgeDifference(user.year, otherUser.year) < 7;
      // communication and country
      const otherUserHasInPersonCommunication =
        otherUser.communication.includes(inPerson);
      const userHasInPersonCommunication =
        user.communication.includes(inPerson);
      const userOtherCommunications = user.communication.filter(
        (method) => method !== inPerson
      );
      const otherUserOtherCommunications = otherUser.communication.filter(
        (method) => method !== inPerson
      );
      const hasMatchedOtherCommunication = userOtherCommunications.some(
        (method) => otherUserOtherCommunications.includes(method)
      );
      const hasInPerson =
        otherUserHasInPersonCommunication && userHasInPersonCommunication;

      console.log(
        `${prefix} runMatchingRound hasSomeLanguages: ${hasSomeLanguages}`
      );
      console.log(
        `${prefix} runMatchingRound checkAgeDifference: ${checkAgeDifference}`
      );
      console.log(
        `${prefix} runMatchingRound hasMatchedOtherCommunication: ${hasMatchedOtherCommunication}`
      );
      console.log(
        `${prefix} runMatchingRound hasInPerson: ${hasInPerson} country match: ${
          otherUser.country === user.country
        }`
      );

      if (!hasSomeLanguages) {
        continue;
      }
      if (!checkAgeDifference) {
        continue;
      }

      if (hasMatchedOtherCommunication) {
        // it's a match
      } else {
        if (!hasInPerson) {
          continue;
        } else if (otherUser.country !== user.country) {
          continue;
        }
      }

      let aiResult;
      if (aiRequestFF) {
        aiResult = await ai.getProfilesScore(user, otherUser);
      } else {
        aiResult = { parsed: true, score: 80 };
      }

      if (aiResult.parsed && aiResult.score >= 40) {
        otherUser.matched_users.push(user._id);
        await otherUser.save();
        user.matched_users.push(otherUser._id);
        await user.save();

        await new matchModel({
          expiration_date: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7), // 7 days
          users: {
            [user._id]: { approved: false },
            [otherUser._id]: { approved: false },
          },
          match_score: aiResult.score,
        }).save();

        sendMessage(user._id.toString(), { code: "new_connection" });
        sendMessage(otherUser._id.toString(), { code: "new_connection" });

        console.log(`${prefix} runMatchingRound match created!!!!`);
        console.log(`${prefix} runMatchingRound otherUser`, otherUser._id);
        console.log(`${prefix} runMatchingRound score`, aiResult.score);
        processedCount++;
      } else {
        console.log(`${prefix} runMatchingRound aiResult not parsed`, user._id);
      }
    }

    console.log(
      `${prefix} runMatchingRound finished processedCount: ${processedCount}`
    );
  } catch (error) {
    console.log(`${prefix} runMatchingRound error`, error);
  }
};

module.exports = { getAllMatches, approveMatch, runMatchingRound };
