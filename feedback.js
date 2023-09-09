const express = require("express");
const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  let feedbackCollection = db.collection("Feedback");

  const router = express.Router();

  // get feedback of a specific course
  router.get("/feedback", (req, res) => {
    let course = req.query.course;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    feedbackCollection
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.type("json").status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error,
        });
      });
  });

  // add new feedback to database
  router.post("/feedback", (req, res) => {
    // add feedback to feedbacks
    let feedback = req.body;
    feedbackCollection.add(feedback).then(() => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json").status(200).json(feedback);
    });
  });

  return router;
};
