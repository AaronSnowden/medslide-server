const QuestionService = require("../services/questions_service");

function getRandomObjects(list) {
  if (list.length <= 5) return list; // Return all if list has 5 or fewer items

  let shuffled = [...list].sort(() => Math.random() - 0.5); // Shuffle array
  return shuffled.slice(0, 5); // Get first 5 items
}

async function getQuestions(req, res) {
  try {
    const course = req.query.course;
    const questions = await QuestionService.getQuestionsByCourse(course);
    res.status(200).json(getRandomObjects(questions));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getQuestionById(req, res) {
  try {
    const question = await QuestionService.getQuestionById(req.params.id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createQuestion(req, res) {
  try {
    const question = await QuestionService.addQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function uploadQuestions(req, res) {
  try {
    let questions = req.body.questions;
    await QuestionService.uploadQuestions(questions);
    res.status(201).json({ message: "questions added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getQuestions,
  getQuestionById,
  uploadQuestions,
  createQuestion,
};
