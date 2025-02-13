const { CoursesCollection, admin } = require("../models/course_model");

// Fetch all courses
async function getAllCourses() {
  const snapshot = await CoursesCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get a single course by ID
async function getCourseById(courseId) {
  const courseRef = CoursesCollection.doc(courseId);
  const docSnapshot = await courseRef.get();
  if (!docSnapshot.exists) {
    throw new Error("Course not found");
  }
  return { id: docSnapshot.id, ...docSnapshot.data() };
}

// Add a new course
async function addCourse(newCourse) {
  await CoursesCollection.add(newCourse);
  return { message: "Course added successfully" };
}

// Upload file to Firebase Storage
async function uploadFileToStorage(file, storage) {
  if (!file) throw new Error("No file uploaded");

  const bucket = storage.bucket();
  const fileUpload = bucket.file(file.originalname);
  await fileUpload.save(file.buffer);

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
}

// Update course topics
async function updateCourseTopics(courseId, newTopic) {
  const courseRef = CoursesCollection.doc(courseId);
  await courseRef.update({
    [`topics.${newTopic.key}`]: newTopic,
  });
  return { message: "Topic updated successfully" };
}

// Delete a course topic and its associated file
async function deleteCourseTopic(courseId, topicId, filePath, storage) {
  const parentDocumentRef = CoursesCollection.doc(courseId);
  await parentDocumentRef.update({
    [`topics.${topicId}`]: admin.firestore.FieldValue.delete(),
  });

  const bucket = storage.bucket();
  await bucket.file(filePath).delete();

  return { message: "Topic and file deleted successfully" };
}

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  uploadFileToStorage,
  updateCourseTopics,
  deleteCourseTopic,
};
