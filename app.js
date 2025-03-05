const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const services = require("./src/config/config.js");

const getOAuthToken = require("./src/api/domains/auth/oauth.js");
const getAppMetadata = require("./src/api/domains/metadata/metadata.js");
const NotificationService = require("./src/util/notification-service");
const notificationService = new NotificationService(services.db, services.fcm);

const userRoutes = require("./src/api/domains/users/routes.js");
const courseRoutes = require("./src/api/domains/courses/routes.js");
const challengeRoutes = require("./src/api/domains/challenges/routes.js");
const questionRoutes = require("./src/api/domains/questions/routes.js");
const feedbackRoutes = require("./src/api/domains/feedback/routes.js");
const commentRoutes = require("./src/api/domains/comments/routes.js");
const subscriptionRoutes = require("./src/api/domains/subscription/routes.js");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Allow all origins and methods
app.use(
  cors({
    origin: "*", // Adjust this to restrict access (e.g., "http://localhost:8080")
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Allow preflight requests

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Medslide server Homepage v3.0");
});

app.get("/api/authtoken", async (req, res) => {
  res.send({
    "auth-token": await getOAuthToken(),
  });
});

app.post("/api/fcmtokenvalid", async (req, res) => {
  res.status(200).send({
    "is-valid": await notificationService.checkFcmTokenValidity(req.body.token),
  });
});

app.get("/api/metadata", async (req, res) => {
  res.send({
    metadata: await getAppMetadata(),
  });
});

app.use("/api", userRoutes);

app.use("/api", courseRoutes);

app.use("/api", challengeRoutes);

app.use("/api", questionRoutes);

app.use("/api", feedbackRoutes);

app.use("/api", commentRoutes);

app.use("/api", subscriptionRoutes);

// app.use("/api/subscriptions", subscriptionRoutes);

// app.use(
//   "/api/",
//   VideosModule({
//     videos,
//   })
// );

// app.use(
//   "/api/",
//   BooksModule({
//     books,
//   })
// );

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server up on port, ", port));

module.exports = app;
