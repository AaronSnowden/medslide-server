const express = require("express");
const commentController = require("../../controllers/comment_controller");

const router = express.Router();

router.get("/comments", commentController.getComments);
router.get("/comments/:id", commentController.getCommentById);
router.post("/comments", commentController.addComment);

module.exports = router;
