const express = require("express");
const courseController = require("../../controllers/course_controller");

const router = express.Router();

router.get("/courses", courseController.getCourses);
router.get("/courses/:id", courseController.getCourse);
router.post("/courses", courseController.createCourse);
router.post(
  "/courses/uploadFile",
  courseController.upload.single("file"),
  courseController.uploadFile
);
router.post(
  "/courses/uploadPdf",
  courseController.upload.single("pdf"),
  courseController.uploadPdf
);
router.post("/courses/:id", courseController.updateCourseTopic);
router.delete("/courses/topics", courseController.deleteCourseTopic);

module.exports = router;
