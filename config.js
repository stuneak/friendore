const isLocalEnv = process.env.BACKEND_ENV === "dev";
const port = isLocalEnv ? "3030" : "3000";
const host = isLocalEnv ? `localhost:${port}` : "friendore.com";
const useHTTPS = !isLocalEnv;
const appUrl = `${useHTTPS ? "https://" : "http://"}${host}`;

module.exports = {
  appUrl,
  google: {
    callbackURL: "/api/auth/login/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
