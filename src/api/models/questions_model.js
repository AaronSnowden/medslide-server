const services = require("../../config/config.js");

const db = services.db;
const QuestionsCollection = db.collection("questions");

module.exports = { QuestionsCollection };
