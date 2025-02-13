const FeedbackService = require("../services/feedback_service");

// Get feedback (optional course filtering)
async function getFeedback(req, res) {
  try {
    const course = req.query.course;
    const feedback = await FeedbackService.getFeedback(course);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add new feedback
async function addFeedback(req, res) {
  try {
    const feedback = await FeedbackService.addFeedback(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFeedback,
  addFeedback,
};
