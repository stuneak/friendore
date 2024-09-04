const userModel = require("../models/userModel.js");
const Joi = require("joi");
const ObjectId = require("mongodb").ObjectId;
const { sendMessage } = require("../websocket");
const db = require("../db/connect");
const mongoose = require("mongoose");

const showProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user.isDeleted) {
      return res.status(404).send({ code: "profile:user_deleted" });
    }

    return res.status(200).send({
      _id: user._id,
      email: user.email,
      year: user.year,
      languages: user.languages,
      communication: user.communication,
      country: user.country,
      hobbies: user.hobbies,
      goals_dreams: user.goals_dreams,
      aboutme: user.aboutme,
      socials: user.socials,
      isAdmin: user.isAdmin,
      state: {
        isApproved: user.state.isApproved,
        isChanged: user.state.isChanged,
        text: user.state.text,
      },
      isAgreedToReceiveEmail: user.isAgreedToReceiveEmail,
    });
  } catch (error) {
    console.log("showProfile", error);
    return res
      .status(500)
      .send({ code: "profile:internal_error", message: error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { user } = req;
    const { body } = req;

    const validate = (data) => {
      const schema = Joi.object({
        languages: Joi.array()
          .items(Joi.string())
          .required()
          .label("languages"),
        communication: Joi.array()
          .items(Joi.string())
          .required()
          .label("communication"),
        country: Joi.custom((value, helper) => {
          if (data?.communication?.includes("in-person") && !value) {
            return helper.message(
              '"country" is required when "communication" includes "in person"'
            );
          }

          return true;
        }),
        hobbies: Joi.array().items(Joi.string()).required().label("hobbies"),
        goals_dreams: Joi.string().required().label("goals_dreams"),
        aboutme: Joi.string().required().label("aboutme"),
        socials: Joi.array().items(Joi.string()).required().label("socials"),
        isAgreedToReceiveEmail: Joi.boolean()
          .required()
          .label("isAgreedToReceiveEmail"),
      });
      return schema.validate(data);
    };

    const { error } = validate(body);
    if (error)
      return res
        .status(400)
        .send({ code: "validation_error", message: error.details[0].message });

    const userInstance = await userModel.findById(user._id);

    userInstance.languages = body.languages;
    userInstance.communication = body.communication;
    userInstance.country = body.country;
    userInstance.hobbies = body.hobbies;
    userInstance.goals_dreams = body.goals_dreams;
    userInstance.aboutme = body.aboutme;
    userInstance.socials = body.socials;
    userInstance.state.isChanged = true;
    userInstance.state.text = "";
    userInstance.isAgreedToReceiveEmail = body.isAgreedToReceiveEmail;

    await userInstance.save();

    const adminProfile = await userModel.findOne({
      isDeleted: false,
      isAdmin: true,
    });

    sendMessage(adminProfile._id.toString(), {
      code: "admin:updates",
    });

    return res.status(200).json({
      _id: userInstance._id,
      email: userInstance.email,
      year: userInstance.year,
      languages: userInstance.languages,
      communication: userInstance.communication,
      country: userInstance.country,
      hobbies: userInstance.hobbies,
      goals_dreams: userInstance.goals_dreams,
      aboutme: userInstance.aboutme,
      socials: userInstance.socials,
      isAdmin: userInstance.isAdmin,
      state: {
        isApproved: userInstance.state.isApproved,
        isChanged: userInstance.state.isChanged,
        text: userInstance.state.text,
      },
      isAgreedToReceiveEmail: userInstance.isAgreedToReceiveEmail,
    });
  } catch (error) {
    console.log("updateProfile", error);
    return res
      .status(500)
      .send({ code: "profile:internal_error", message: error });
  }
};

const destroyProfile = async (user_id) => {
  try {
    if (!user_id) {
      return { status: 404, code: "profile:not_found" };
    }
    const userProfile = await userModel.findById(new ObjectId(user_id));
    userProfile.state.isChanged = false;
    userProfile.state.isApproved = false;
    userProfile.state.text = "";
    userProfile.markModified("state");
    userProfile.isDeleted = true;

    await userProfile.save();

    await mongoose.connection.db
      .collection("sessions")
      .deleteMany({ "session.passport.user": user_id });

    sendMessage(user_id, {
      code: "profile:destroyed",
    });

    return { status: 200, queryErrorHandle: true, code: "profile:deleted" };
  } catch (error) {
    console.log("destroyProfile", error);
    return { status: 500, code: "profile:internal_error", message: error };
  }
};

const unsubscribeFromEmails = async (req, res) => {
  try {
    const { body } = req;
    const hash = body.hash;
    const [uniqueHash, user_id] = hash.split("$sep$");

    const userProfile = await userModel.findById(new ObjectId(user_id));

    if (userProfile.uniqueHash === uniqueHash) {
      userProfile.isAgreedToReceiveEmail = false;
      await userProfile.save();

      return res.status(200).send({ code: "profile:unsubscribed" });
    }

    return res.status(404).send({ code: "profile:notfound" });
  } catch (error) {
    console.log("unsubscribeFromEmails", error);
    return res
      .status(500)
      .send({ code: "profile:internal_error", message: error });
  }
};

module.exports = {
  showProfile,
  updateProfile,
  destroyProfile,
  unsubscribeFromEmails,
};
