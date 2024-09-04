const matchModel = require("../models/matchModel");
const userModel = require("../models/userModel");
const ObjectId = require("mongodb").ObjectId;

const getAllFriends = async (req, res) => {
  try {
    const { user } = req;

    const matches = await matchModel.aggregate([
      {
        $match: {
          friends_expiration_date: {
            $gte: new Date(),
          },
          // Ensure `friends_expiration_date` exists, is not undefined, and is greater than or equal to the current date
          [`users.${user._id}.approved`]: true,
        },
      },
      {
        $addFields: {
          allUsersApproved: {
            $reduce: {
              input: { $objectToArray: "$users" }, // Convert the `users` object to an array of key-value pairs
              initialValue: true,
              in: {
                $and: [
                  "$$value",
                  { $eq: ["$$this.v.approved", true] }, // Check if each user's `approved` value is true
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          allUsersApproved: true, // Filter to only include documents where all users are approved
        },
      },
    ]);

    matches.sort(
      (a, b) => a.friends_expiration_date - b.friends_expiration_date
    );

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
        socials: userProfile.socials,
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
        friends_expiration_date: match.friends_expiration_date,
        userProfile: otherUsersMap[otherUserId], // Merge the other user's profile
      };
    });

    const matchesWithoutDeleted = matchesWithOtherUser.filter((match) => {
      return !match.userProfile.isDeleted;
    });

    return res.status(200).send({
      friends: matchesWithoutDeleted,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: "friend:internal_error", message: error });
  }
};

module.exports = { getAllFriends };
