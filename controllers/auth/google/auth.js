const userModel = require("../../../models/userModel");
const Joi = require("joi");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

async function googleRegisterCallback(req, res, next) {
  const email = req.session.email;
  if (!email) {
    throw new Error("Failed to extract email from profile, exiting");
  }

  const userLocal = await userModel.findOne({ email, login_method: "local" });
  const userGoogle = await userModel.findOne({ email, login_method: "google" });

  if (userLocal) {
    delete req.session.email;
    req.session.destroy();
    return res.redirect(
      `/?error=google-register-callback:account_local_exists`
    );
  }

  if (userGoogle) {
    if (userGoogle.isDeleted) {
      return res.redirect("/?error=login:user_deleted");
    }

    req.login(userGoogle, function (err) {
      if (!err) {
        return res.redirect(`/`);
      } else {
        console.log("googleRegisterCallback: user google register failed {", {
          err,
        });

        return res.redirect("/?error=google-callback:register_failed");
      }
    });
    return;
  } else {
    return res.redirect(`/?auth=google`);
  }
}

const validate = (data) => {
  const schema = Joi.object({
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

const googleRegister = async (req, res) => {
  try {
    const email = req.session.email;
    if (!email) {
      throw new Error("Failed to extract email from profile, exiting");
    }

    const { error } = validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ code: "validation_error", message: error.details[0].message });

    const userProfile = {
      email,
      year: req.body.year,
      languages: req.body.languages,
      communication: req.body.communication,
      country: req.body.country,
      hobbies: req.body.hobbies,
      goals_dreams: req.body.goals_dreams,
      aboutme: req.body.aboutme,
      socials: req.body.socials,
      login_method: "google",
      isDeleted: false,
      isAdmin: false,
      state: {
        isApproved: false,
        isChanged: true,
        text: "",
      },
      isAgreedToReceiveEmail: true,
    };

    user = await new userModel({
      ...userProfile,
      uniqueHash: uuidv4(),
    }).save();

    req.login(user, function (err) {
      if (!err) {
        return res.status(200).send({
          code: "user_google_added",
          message: "use was added successfully",
          user: userProfile,
        });
      } else {
        console.log("googleRegister: googleRegister failed {", { err });

        return res
          .status(500)
          .send({ queryErrorHandle: true, code: "google:register_failed" });
      }
    });
  } catch (error) {
    console.log("googleRegister", error);
    return res
      .status(500)
      .send({ code: "auth-google:internal_error", message: error });
  }
};

async function googleLoginCallback(req, res, next) {
  if (req.query.error) {
    console.log("googleLoginCallback req.query.error", {
      queryError: req.query.error,
    });
    return res.redirect("/");
  }

  passport.authenticate("google", async (err, user, info) => {
    if (err) {
      console.log("googleLoginCallback err", { err, info });
      return res.redirect("/?error=google:login_failed");
    }
    if (info?.code) {
      return res.redirect(`/?error=${info.code}`);
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.log("googleLoginCallback: ", loginError);
        return res.redirect(`/`);
      } else {
        console.log(
          `googleLoginCallback: google login success for ${user.email}`
        );
        return res.redirect(`/`);
      }
    });
  })(req, res, next);
}

module.exports = {
  googleRegisterCallback,
  googleRegister,
  googleLoginCallback,
};
