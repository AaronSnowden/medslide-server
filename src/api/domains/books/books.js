const express = require("express");
const services = require("../../../config/config.js");
const db = services.db;

module.exports = (options = {}) => {
  const BooksCollection = db.collection("Books");

  let books = options.books;

  const router = express.Router();

  router.get("/books", (req, res) => {
    try {
      BooksCollection.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.type("json").status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({
        general: "Something went wrong, please try again",
        errorMessage: error,
      });
    }
  });

  router.get("/books/:id", (req, res) => {
    let booksId = req.params.id;
    const booksRef = BooksCollection.doc(booksId);

    // Retrieve the document data
    booksRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          res.type("json").status(200).json(data);
        } else {
          res
            .status(404)
            .json({ general: "Something went wrong, please try again" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error,
        });
      });
  });

  router.get("/books/:course", (req, res) => {
    let course = req.params.course;
    BooksCollection.where("course", "==", course)
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

  //add new book
  router.post("/books", async (req, res) => {
    let book = req.body;
    let booksRef = await BooksCollection.add(book);
    const data = { id: booksRef.id, ...book };
    res.type("json").status(200).json(data);
  });

  return router;
};
