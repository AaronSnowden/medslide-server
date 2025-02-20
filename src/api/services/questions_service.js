const { QuestionsCollection } = require("../models/questions_model.js");

// Get all questions for a course
async function getQuestionsByCourse(course) {
  const snapshot = await QuestionsCollection.where(
    "course",
    "==",
    course
  ).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get question by ID
async function getQuestionById(questionId) {
  const doc = await QuestionsCollection.doc(questionId).get();
  if (!doc.exists) throw new Error("Question not found");
  return { id: doc.id, ...doc.data() };
}

// Add new question
async function addQuestion(question) {
  await QuestionsCollection.add(question);
  return question;
}

// Add bulk questions
async function uploadQuestions(questions) {
  questions.forEach(async (question) => {
    await addQuestion(question);
  });
  return questions;
}

module.exports = {
  getQuestionsByCourse,
  getQuestionById,
  uploadQuestions,
  addQuestion,
};
