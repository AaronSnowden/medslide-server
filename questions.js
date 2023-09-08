const express = require("express");
const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  let QuestionsCollection = db.collection("questions");

  const router = express.Router();

  // get questions of a specific course
  router.get("/questions", (req, res) => {
    let course = req.query.course;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    QuestionsCollection.where("course", "==", course)
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

  // add new question to database
  router.post("/questions", (req, res) => {
    // add question to questions
    let question = req.body;
    QuestionsCollection.add(question).then(() => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json").status(200).json(question);
    });
  });

  //   get specific question
  router.get("/questions/:id", (req, res) => {
    let questionId = req.params.id;
    const questionRef = QuestionsCollection.doc(questionId);

    // Retrieve the document data
    questionRef
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
