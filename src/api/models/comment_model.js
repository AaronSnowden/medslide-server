const services = require("../../config/config.js");

const db = services.db;
const CommentsCollection = db.collection("Comments");

module.exports = { CommentsCollection };
