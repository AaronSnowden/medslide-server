const express = require("express");

module.exports = (options = {}) => {
  let videos = options.videos;

  const router = express.Router();

  router.get("/videos", (req, res) => {
    let query = req.query;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (query.course) {
      videos.forEach((element) => {
        element.course == query.course ? _payLoad.push(element) : null;
      });
      res.json(_payLoad);
    } else {
      res.json(videos);
    }
  });

  router.get("/videos/:id", (req, res) => {
    let videoId = req.params.id;
    let video = videos[videoId];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(video);
  });

  return router;
};
