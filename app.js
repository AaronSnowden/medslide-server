const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

// Define storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const coursesModule = require("./courses.js");
const UsersModule = require("./users.js");
const VideosModule = require("./videos.js");
const BooksModule = require("./books.js");
const ChallengesModule = require("./challenges.js");
const CommentsModule = require("./comments.js");
const QuestionsModule = require("./questions.js");
const FeedbackModule = require("./feedback.js");

//import the data
const data_file = require("./data.js");
const data = data_file.app_data();
const courses = data.all_courses;
const users = data.all_users;
const videos = data.all_videos;
const books = data.all_books;
const challenges = data.all_challenges;
const comments = data.all_comments;
const feedback = data.all_feedback;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// restricting cors to paths statrting with api
// app.use("/api", require("cors")());

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-OrIgin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Medslide server Homepage v2.0");
});

app.use(
  "/api/",
  coursesModule({
    courses,
  })
);

app.use(
  "/api/",
  UsersModule({
    users,
  })
);

app.use(
  "/api/",
  VideosModule({
    videos,
  })
);

app.use(
  "/api/",
  BooksModule({
    books,
  })
);

app.use(
  "/api/",
  CommentsModule({
    comments,
  })
);

app.use(
  "/api/",
  FeedbackModule({
    feedback,
  })
);

app.use(
  "/api/",
  ChallengesModule({
    challenges,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server up on port, ", port));
