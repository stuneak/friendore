const passport = require("passport");

const auth = (authName, authOptions) => {
  return (req, res, next) => {
    const callbackRedirectUrl = req.session.callbackRedirectUrl;
    if (!callbackRedirectUrl) {
      throw new Error("callbackRedirectUrl is not set in session");
    }

    const state = { callbackRedirectUrl };
    const additionalArgs =
      typeof authOptions === "function"
        ? authOptions(state, req)
        : { ...authOptions, state: JSON.stringify(state) };
    passport.authenticate(authName, additionalArgs)(req, res, next);
  };
};

const callback = (authName, stateGetter) => {
  stateGetter =
    stateGetter || ((req) => req.query.state && JSON.parse(req.query.state));
  if (typeof authName !== "string") {
    throw new Error("authName must be a string");
  }

  return (req, res, next) => {
    if (req.query.error) {
      return res.redirect("/");
    }

    const state = stateGetter(req);
    passport.authenticate(authName, (err, profile) => {
      req.session.email = profile.email;
      if (err) {
        console.log("callback", authName, err);
        return res.redirect("/?error=google-onboarding:failed");
      } else {
        if (state && state.callbackRedirectUrl) {
          return res.redirect(state.callbackRedirectUrl);
        } else {
          return res.sendStatus(200);
        }
      }
    })(req, res, next);
  };
};

module.exports = { auth, callback };
