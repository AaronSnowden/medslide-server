const express = require("express");
const questionController = require("../../controllers/question_controller");

const router = express.Router();

router.get("/questions", questionController.getQuestions);
router.get("/questions/:id", questionController.getQuestionById);
router.post("/questions", questionController.createQuestion);
router.post("/questions/bulkupload", questionController.uploadQuestions);

module.exports = router;
