const authController = require("./controllers/auth");
const profile = require("./controllers/profile");
const match = require("./controllers/match");
const friend = require("./controllers/friend");
const admin = require("./controllers/admin");

const ensureAuthenticated = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.sendStatus(401);
};

const isAdminRoute = (req, res, next) => {
  return req.user.isAdmin
    ? next()
    : res.status(403).send({ code: "not_allowed" });
};

const initRoutes = (app) => {
  authController.initRoutes(app);

  // PROFILE ROUTES
  app.get("/api/profile", ensureAuthenticated, profile.showProfile);
  app.post("/api/profile", ensureAuthenticated, profile.updateProfile);
  app.delete("/api/profile", ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const deletedProfile = await profile.destroyProfile(user._id.toString());

    return res.status(deletedProfile.status).send({
      code: deletedProfile.code,
      message: deletedProfile.message,
      queryErrorHandle: deletedProfile.queryErrorHandle,
    });
  });
  app.post("/api/profile/unsubscribe", profile.unsubscribeFromEmails);

  // MATCH ROUTES
  app.post("/api/match", ensureAuthenticated, match.approveMatch);
  app.get("/api/match", ensureAuthenticated, match.getAllMatches);

  // FRIENDS ROUTES
  app.get("/api/friend", ensureAuthenticated, friend.getAllFriends);

  // ADMIN ROUTES
  app.get(
    "/api/admin/profile",
    ensureAuthenticated,
    isAdminRoute,
    admin.getUserProfiles
  );
  app.post(
    "/api/admin/profile",
    ensureAuthenticated,
    isAdminRoute,
    admin.changeUserProfile
  );

  app.delete(
    "/api/admin/profile",
    ensureAuthenticated,
    isAdminRoute,
    admin.destroyUserProfile
  );
};

module.exports = { initRoutes };
