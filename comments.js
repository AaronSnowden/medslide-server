const express = require("express");

module.exports = (options = {}) => {
  let comments = options.comments;

  const router = express.Router();

  router.get("/comments", (req, res) => {
    let query = req.query;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (query.course) {
      comments.forEach((element) => {
        element.course == query.course ? _payLoad.push(element) : null;
      });
      res.json(_payLoad);
    } else {
      res.json(comments);
    }
  });

  router.post("/comments", (req, res) => {
    // add comment to comments
    let comment = req.body;
    console.log(comment);
    comments.push(comment);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(comment);
  });

  router.get("/comments/:id", (req, res) => {
    let commentId = req.params.id;
    let comment = comments[commentId];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(comment);
  });

  return router;
};
