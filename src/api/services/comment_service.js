const { CommentsCollection } = require("../models/comment_model");

// Fetch comments (optional filter by course)
async function getComments(course) {
  let query = CommentsCollection;

  if (course) {
    query = query.where("course", "==", course);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single comment by ID
async function getCommentById(commentId) {
  const docSnapshot = await CommentsCollection.doc(commentId).get();
  if (!docSnapshot.exists) {
    throw new Error("Comment not found");
  }
  return { id: docSnapshot.id, ...docSnapshot.data() };
}

// Add a new comment
async function addComment(comment) {
  await CommentsCollection.add(comment);
  return comment;
}

module.exports = {
  getComments,
  getCommentById,
  addComment,
};
