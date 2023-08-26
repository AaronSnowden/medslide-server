const express = require("express");

const coursesModule = require("./courses.js");
const UsersModule = require("./users.js");
const VideosModule = require("./videos.js");
const BooksModule = require("./books.js");
const ChallengesModule = require("./challenges.js");
const CommentsModule = require("./comments.js");

//import the data
const data_file = require("./data.js");
const data = data_file.app_data();
const courses = data.all_courses;
const users = data.all_users;
const videos = data.all_videos;
const books = data.all_books;
const challenges = data.all_challenges;
const comments = data.all_comments;

const app = express();

app.use(express.json());
// restricting cors to paths statrting with api
// app.use("/api", require("cors")());

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-OrIgin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Medslide server Homepage");
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
  ChallengesModule({
    challenges,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server up on port, ", port));
