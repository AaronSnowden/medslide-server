const services = require("../../config/config.js");

const db = services.db;
const ChallengesCollection = db.collection("Challenges");

module.exports = { ChallengesCollection };
