const CommentService = require("../services/comment_service");

// Get comments (optional filter by course)
async function getComments(req, res) {
  try {
    const course = req.query.course;
    const comments = await CommentService.getComments(course);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a specific comment by ID
async function getCommentById(req, res) {
  try {
    const comment = await CommentService.getCommentById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Add a new comment
async function addComment(req, res) {
  try {
    const comment = await CommentService.addComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getComments,
  getCommentById,
  addComment,
};
