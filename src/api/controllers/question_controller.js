const QuestionService = require("../services/questions_service");

async function getQuestions(req, res) {
  try {
    const course = req.query.course;
    const questions = await QuestionService.getQuestionsByCourse(course);
    res.status(200).json(questions);
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

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
};
