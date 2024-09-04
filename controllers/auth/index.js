// const { sendEmail } = require("../utils/sendEmail.js");
const { localRegister, localLogin } = require("./local/auth");
const {
  googleRegisterCallback,
  googleRegister,
  googleLoginCallback,
} = require("./google/auth");
const googleMiddleware = require("./google/middleware");
const rateLimit = require("express-rate-limit");
const passport = require("passport");

require("./google/passport");
require("./local/passport");

const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

async function setSecurityToken(req, _res, next) {
  req.session.token = Math.random().toString(36).substring(10);
  return next();
}

function checkSecurityToken(tokenStringGetter) {
  return (req, res, next) => {
    const token = tokenStringGetter(req);
    const tokenAtSession = req.session.token;
    if (tokenAtSession && !req.user && tokenAtSession !== token) {
      console.log(
        `checkSecurityToken: Invalid security token received ${token} instead of ${req.session.token}`
      );
      return res.redirect("/");
    }
    return next();
  };
}

const initRoutes = (app) => {
  // AUTH ROUTES
  app.post("/api/auth/login/local", localLogin);
  app.post("/api/auth/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        console.log("logout: if (err) {", { err });
        return res
          .status(500)
          .send({ queryErrorHandle: true, code: "logout_failed" });
      }
      delete req.session.email;
      req.session.destroy();
      return res.sendStatus(200);
    });
  });

  app.post("/api/auth/register/local", registerLimiter, localRegister);

  // GOOGLE AUTH ROUTES
  app.post("/api/auth/register/google", registerLimiter, googleRegister);
  app.get("/api/auth/register/google", function (req, res, next) {
    const [url, optionalQuery] = req.originalUrl.split("?");
    const query = optionalQuery ? `?${optionalQuery}` : "";
    req.session.callbackRedirectUrl = `${url}/callback${query}`;
    return res.redirect(`/api/auth/onboarding/google`);
  });
  app.get("/api/auth/register/google/callback", googleRegisterCallback);

  app.get("/api/auth/login/google", setSecurityToken, (req, res, next) => {
    passport.authenticate("google", {
      scope: ["email"],
      state: req.session.token,
    })(req, res, next);
  });
  app.get(
    "/api/auth/login/google/callback",
    checkSecurityToken((req) => req.query.state),
    googleLoginCallback
  );

  app.get(
    "/api/auth/onboarding/google",
    googleMiddleware.auth("google-onboarding", {
      scope: ["email"],
    })
  );
  app.get(
    "/api/auth/onboarding/google/callback",
    googleMiddleware.callback("google-onboarding")
  );
};

module.exports = {
  initRoutes,
};
