const express = require("express");
const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  const VideosCollection = db.collection("Videos");

  const router = express.Router();

  router.get("/videos", (req, res) => {
    let query = req.query;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    VideosCollection.where("course", "==", course).get();
    then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.type("json").status(200).json(data);
    }).catch((error) => {
      res.status(500).json({
        general: "Something went wrong, please try again",
        errorMessage: error,
      });
    });
  });

  router.get("/videos/:id", (req, res) => {
    let videoId = req.params.id;
    const videoRef = VideosCollection.doc(videoId);

    // Retrieve the document data
    videoRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = { id: docSnapshot.id, ...docSnapshot.data() };
          res.type("json").status(200).json(data);
        } else {
          res.status(404).json({ general: "Not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error.toString(),
        });
      });
  });

  return router;
};
