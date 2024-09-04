const passport = require("passport");

const auth = (authName, authOptions) => {
  return (req, res, next) => {
    const callbackRedirectUrl = req.session.callbackRedirectUrl;
    // callbackRedirectUrl is an URL where request would be redirected after it is sucessfully processed auth callback
    // callbackRedirectUrl route would additionally post-process request and perform necessary operations with request
    // absense of callbackRedirectUrl most likely means that this route was invoked directly which doesn't give much
    if (!callbackRedirectUrl) {
      throw new Error("callbackRedirectUrl is not set in session");
    }

    // callbackRedirectUrl is pushed into state which will be available in auth callback in req.query.state as a string
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
      // so far i've seen it when user clicks cancel in slack auth
      return res.redirect("/");
    }

    // retrieve callbackRedirectUrl
    const state = stateGetter(req);
    passport.authenticate(authName, (err, profile) => {
      // just save the profile into session since direct req.<property> assignments are not saved between redirects
      // Next route that request redirects to will process the profile according to its 'needs'
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
