const userModel = require("../models/userModel.js");
const ObjectId = require("mongodb").ObjectId;
const Joi = require("joi");
const profile = require("./profile");
const { sendMessage } = require("../websocket");
const matchController = require("./match");
const sendEmail = require("../utils/sendEmail");

const getUserProfiles = async (req, res) => {
  try {
    const users = await userModel.find({
      isDeleted: false,
      isAdmin: false,
      "state.isApproved": false,
      "state.isChanged": true,
    });

    return res.status(200).send({ userProfiles: users });
  } catch (error) {
    console.log("getUserProfiles", error);
    return res
      .status(500)
      .send({ code: "admin:internal_error", message: error });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    isApproved: Joi.boolean().required().label("isApproved"),
    isChanged: Joi.boolean().required().label("isChanged"),
    text: Joi.string().label("text"),
    user_id: Joi.string().required().label("user_id"),
  });
  return schema.validate(data);
};

const changeUserProfile = async (req, res) => {
  try {
    const { body } = req;

    const user_id = body.user_id;

    const { error } = validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ code: "validation_error", message: error.details[0].message });

    const userProfile = await userModel.findOne({
      _id: new ObjectId(user_id),
      isDeleted: false,
      isAdmin: false,
      "state.isApproved": false,
    });

    if (!userProfile) {
      return res.status(404).send({ code: "admin:user_not_found" });
    }
    userProfile.state.isChanged = body.isChanged;
    userProfile.state.isApproved = body.isApproved;
    userProfile.state.text = body.text || "";

    if (body.isApproved) {
      userProfile.state.text = "";
    }

    userProfile.markModified("state");
    await userProfile.save();

    if (body.isApproved) {
      sendMessage(user_id, {
        code: "profile:approved",
      });
      void sendEmail.sendProfileApprovalMessage({
        email: userProfile.email,
        isAgreedToReceiveEmail: userProfile.isAgreedToReceiveEmail,
        uniqueHash: userProfile.uniqueHash,
        _id: userProfile._id,
      });
    }

    if (!body.isChanged) {
      sendMessage(user_id, {
        code: "profile:needChanges",
      });
    }

    if (userProfile.state.isApproved) {
      const prefix = `AccountApproval ${Math.floor(
        Math.random() * 899999 + 100000
      )}`;

      void matchController.runMatchingRound(userProfile, { prefix });
    }

    return res.status(200).send({
      isChanged: userProfile.state.isChanged,
      isApproved: userProfile.state.isApproved,
    });
  } catch (error) {
    console.log("approveUserProfile", error);
    return res
      .status(500)
      .send({ code: "admin:internal_error", message: error });
  }
};

const destroyUserProfile = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    if (!user_id) {
      return res.status(404).send({ code: "admin:user_not_found" });
    }

    const deletedProfile = await profile.destroyProfile(user_id);

    return res.status(deletedProfile.status).send({
      code: deletedProfile.code,
      message: deletedProfile.message,
      queryErrorHandle: deletedProfile.queryErrorHandle,
    });
  } catch (error) {
    console.log("destroyUserProfile", error);
    return res
      .status(500)
      .send({ code: "admin:internal_error", message: error });
  }
};

module.exports = { getUserProfiles, changeUserProfile, destroyUserProfile };
