const { FeedbackCollection } = require("../models/feedback_model");

// Fetch all feedback (optional filter by course)
async function getFeedback(course) {
  let query = FeedbackCollection;

  if (course) {
    query = query.where("course", "==", course);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Add new feedback
async function addFeedback(feedback) {
  await FeedbackCollection.add(feedback);
  return feedback;
}

module.exports = {
  getFeedback,
  addFeedback,
};
