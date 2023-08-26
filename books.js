const express = require("express");
const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  const BooksCollection = db.collection("Books");

  let books = options.books;

  const router = express.Router();

  router.get("/books", (req, res) => {
    let query = req.query;
    let _payLoad = [];

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (query.course) {
      books.forEach((element) => {
        element.course === query ? _payLoad.push(element) : null;
      });
      res.json(_payLoad);
    } else {
      res.json(books);
    }
  });

  router.get("/books/:id", (req, res) => {
    let bookId = req.params.id;
    let book = books[bookId];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(book);
  });

  router.get("/books/:course", (req, res) => {
    let course = req.params.course;
    let _books = books[course];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(_books);
  });

  return router;
};
