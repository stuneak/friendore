const config = require("../../../config.js");
const passport = require("passport");
const passportGoogleOauth2 = require("passport-google-oauth2");
const userModel = require("../../../models/userModel");

passport.use(
  "google-onboarding",
  new passportGoogleOauth2.Strategy(
    {
      ...config.google,
      callbackURL: `${config.appUrl}/api/auth/onboarding/google/callback`,
    },
    (_accessToken, _refreshToken, profile, done) => {
      console.info(
        `received auth request for email: ${profile && profile.email}`
      );
      if (!profile) {
        done(null, false, { code: "incorrect_google_profile" });
      }
      done(null, profile);
    }
  )
);

passport.use(
  "google",
  new passportGoogleOauth2.Strategy(
    config.google,
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.email;

        console.log("(google) started");

        if (!email) {
          return done(null, false, { code: "incorrect_email_profile" });
        }

        console.log(`Authing user: ${email}`);

        const accountGoogle = await userModel.findOne({
          email,
          login_method: "google",
        });

        const accountLocal = await userModel.findOne({
          email,
          login_method: "local",
        });

        if (accountLocal) {
          return done(null, false, { code: "google:account_local_exists" });
        }

        if (!accountGoogle) {
          return done(null, false, { code: "google:account_not_found" });
        }

        if (accountGoogle.isDeleted) {
          return done(null, false, { code: "login:user_deleted" });
        }

        return done(null, accountGoogle);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
