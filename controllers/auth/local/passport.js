const userModel = require("../../../models/userModel.js");
// const { sendEmail } = require("../utils/sendEmail.js");
const { scryptVerify } = require("../../../utils/password.js");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// PASSPORT LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({
          email: username,
          login_method: "local",
        });

        const userGoogle = await userModel.findOne({
          email: username,
          login_method: "google",
        });

        if (userGoogle) {
          return done(null, false, { code: "google_account" });
        }

        if (!user) {
          return done(null, false, { code: "incorrect_username" });
        }

        // Function defined at bottom of app.js
        const isValid = await scryptVerify(password, user.hash);

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, { code: "incorrect_password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// PASSPORT SERIALIZATION
passport.serializeUser(function (user, done) {
  done(null, user._id.toString());
});

passport.deserializeUser(function (id, done) {
  userModel.findById(id).then((acc) => {
    done(null, acc);
  }, done);
});
