const express = require("express");
const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  let CommentsCollection = db.collection("Comments");

  const router = express.Router();

  router.get("/comments", (req, res) => {
    let course = req.query.course;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    CommentsCollection.where("course", "==", course).get();
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

  router.post("/comments", (req, res) => {
    // add comment to comments
    let comment = req.body;
    CommentsCollection.add(comment).then(() => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json").status(200).json(comment);
    });
  });

  router.get("/comments/:id", (req, res) => {
    let commentId = req.params.id;
    const commentRef = CommentsCollection.doc(commentId);

    // Retrieve the document data
    commentRef
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
