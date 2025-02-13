const services = require("../../config/config.js");

const db = services.db;
const admin = services.admin;

const CoursesCollection = db.collection("Courses");

module.exports = { CoursesCollection, admin };
