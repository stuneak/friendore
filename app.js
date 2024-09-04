require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const path = require("path");
const { createServer } = require("http");

const db = require("./db/connect");
const { initRoutes } = require("./routes");
const featureModel = require("./models/featureModel.js");
const { initServer, initConnection } = require("./websocket");
const { applyMongoIndex } = require("./mongo-index");

const isProd = process.env.BACKEND_ENV === "prod";
const PROD_VPS_IP = process.env.PROD_VPS_IP;

const app = express();
const httpServer = createServer(app);

const sessionMiddleware = session({
  name: "ssid",
  store: MongoStore.create({
    clientPromise: db.then((resp) => resp.getClient()),
    serialize: (x) => x,
    unserialize: (x) => x,
    autoRemove: "disabled",
    touchAfter: 3600 * 24,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: isProd,
    secure: isProd,
    maxAge: 1000 * 60 * 60 * 24 * 180,
  },
  proxy: isProd,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
});

if (isProd) {
  app.use(
    cors({
      origin: "https://friendore.com",
      credentials: true,
    })
  );
} else {
  app.use(cors());
}

initServer(httpServer);

if (isProd) {
  app.set("trust proxy", (ip) => {
    if (ip === "127.0.0.1" || ip === PROD_VPS_IP) return true; // trusted IPs
    else return false;
  });
}

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//Add this before the app.get() block
initConnection();
initRoutes(app);

if (isProd) {
  app.use(
    express.static(path.join(__dirname, "client/dist"), {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (path.basename(filePath) === "index.html") {
          // Disable caching for index.html
          res.set("Cache-Control", "no-cache, no-store, must-revalidate");
          res.set("Pragma", "no-cache");
          res.set("Expires", "0");
        } else {
          // Cache other static assets
          res.set("Cache-Control", `public, max-age=${60 * 60 * 24 * 1}`);
        }
      },
    })
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;

const createDefaultFeature = async () => {
  const feature = await featureModel.findOne();
  if (!feature) {
    await featureModel.create({
      aiRequest: false,
      sendConnectionEmail: false,
      sendFriendEmail: false,
    });
  }
};

const start = async () => {
  try {
    await db;
    await createDefaultFeature();

    httpServer.listen(port, () => {
      console.log("Server listening on port " + port);
    });
    void applyMongoIndex();
  } catch (error) {
    console.log(error);
  }
};

start();
