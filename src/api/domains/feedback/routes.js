const express = require("express");
const feedbackController = require("../../controllers/feedback_controller");

const router = express.Router();

router.get("/feedback", feedbackController.getFeedback);
router.post("/feedback", feedbackController.addFeedback);

module.exports = router;
