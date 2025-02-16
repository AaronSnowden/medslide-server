const ChallengeService = require("../services/challenge_service.js");
const services = require("../../config/config.js");
const NotificationService = require("../../util/notification-service.js");

const notificationService = new NotificationService(services.db, services.fcm);

async function getChallenges(req, res) {
  try {
    const user = req.query.user;
    const challenges = await ChallengeService.getUserChallenges(user);

    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSettledChallenges(req, res) {
  try {
    const user = req.query.user;
    const challenges = await ChallengeService.getSettledChallenges(user);
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllChallenges(req, res) {
  try {
    const challenges = await ChallengeService.getAllChallenges();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChallengeById(req, res) {
  try {
    const challenge = await ChallengeService.getChallengeById(req.params.id);
    res.status(200).json(challenge);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createChallenge(req, res) {
  try {
    const challenge = await ChallengeService.createChallenge(
      req.body,
      notificationService
    );
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateChallengeWinner(req, res) {
  try {
    const { winner } = req.body;
    const challengeId = req.params.id;
    const response = await ChallengeService.updateChallengeWinner(
      challengeId,
      winner
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getChallenges,
  getSettledChallenges,
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallengeWinner,
};
