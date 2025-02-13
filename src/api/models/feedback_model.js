const services = require("../../config/config.js");

const db = services.db;
const FeedbackCollection = db.collection("Feedback");

module.exports = { FeedbackCollection };
