const services = require("../../config/config.js");
const courseService = require("../services/course_service.js");
const multer = require("multer");

const storage = services.storage;
const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

async function getCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createCourse(req, res) {
  try {
    const response = await courseService.addCourse(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function uploadFile(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const storageUrl = await courseService.uploadFileToStorage(
      req.file,
      storage
    );
    res.status(200).json({ message: "File uploaded successfully", storageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function uploadPdf(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = await courseService.uploadFileToStorage(req.file, storage);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
}

async function updateCourseTopic(req, res) {
  try {
    const response = await courseService.updateCourseTopics(
      req.params.id,
      req.body
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCourseTopic(req, res) {
  try {
    const { courseId, topicId, filePath } = req.body;
    const response = await courseService.deleteCourseTopic(
      courseId,
      topicId,
      filePath,
      storage
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  uploadFile,
  uploadPdf,
  updateCourseTopic,
  deleteCourseTopic,
  upload,
};
