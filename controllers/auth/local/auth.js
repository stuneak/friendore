const userModel = require("../../../models/userModel.js");
const sendEmail = require("../../../utils/sendEmail");
const Joi = require("joi");
const { scryptHash } = require("../../../utils/password.js");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

const localLogin = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log("localLogin: if (err) {", { err });
      return res
        .status(500)
        .send({ queryErrorHandle: true, code: "local-login:auth_failed" });
    }
    if (!user) {
      console.log("localLogin: if (!user) {", { err, info });

      return res.status(401).send({
        success: false,
        code: info.code,
        message: info.message,
      });
    }

    if (user.isDeleted) {
      return res
        .status(500)
        .send({ queryErrorHandle: true, code: "login:user_deleted" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log("localLogin: if (loginErr) {", { err });
        return res
          .status(500)
          .send({ queryErrorHandle: true, code: "local-login:failed" });
      }

      const userProfile = {
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
        state: user.state,
        isAgreedToReceiveEmail: user.isAgreedToReceiveEmail,
      };

      return res.status(200).send({
        code: "login_success",
        user: userProfile,
      });
    });
  })(req, res, next);
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().min(4).required().label("password"),
    year: Joi.number().required().label("year"),
    languages: Joi.array().items(Joi.string()).required().label("languages"),
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
  });
  return schema.validate(data);
};

const localRegister = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ code: "validation_error", message: error.details[0].message });

    let user = await userModel.findOne({
      email: req.body.email,
    });
    if (user)
      return res.status(409).send({
        code: "user_already_exist",
        message: "User with given email already exist",
      });

    const userProfile = {
      email: req.body.email,
      year: req.body.year,
      languages: req.body.languages,
      communication: req.body.communication,
      country: req.body.country,
      hobbies: req.body.hobbies,
      goals_dreams: req.body.goals_dreams,
      aboutme: req.body.aboutme,
      socials: req.body.socials,
      login_method: "local",
      isDeleted: false,
      isAdmin: false,
      state: {
        isApproved: false,
        isChanged: true,
        text: "",
      },
      isAgreedToReceiveEmail: true,
    };

    const hashPassword = await scryptHash({ password: req.body.password });
    user = await new userModel({
      ...userProfile,
      hash: hashPassword,
      uniqueHash: uuidv4(),
    }).save();

    void sendEmail.sendLocalSignUpMessage({
      email: userProfile.email,
      password: req.body.password,
      isAgreedToReceiveEmail: userProfile.isAgreedToReceiveEmail,
      uniqueHash: user.uniqueHash,
      _id: user._id,
    });

    req.login(user, function (err) {
      if (!err) {
        return res.status(200).send({
          code: "user_added",
          message: "use was added successfully",
          user: userProfile,
        });
      } else {
        console.log("localRegister signup: else {", { err });

        return res
          .status(500)
          .send({ queryErrorHandle: true, code: "local-register:failed" });
      }
    });
  } catch (error) {
    console.log("localRegister", error);
    return res
      .status(500)
      .send({ code: "auth-local:internal_error", message: error });
  }
};

module.exports = { localRegister, localLogin };
