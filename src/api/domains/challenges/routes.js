const express = require("express");
const challengeController = require("../../controllers/challenge_controller");

const router = express.Router();

router.get("/challenges", challengeController.getChallenges);
router.get("/challenges/settled", challengeController.getSettledChallenges);
router.get("/challenges/all", challengeController.getAllChallenges);
router.get("/challenges/:id", challengeController.getChallengeById);
router.post("/challenges", challengeController.createChallenge);
router.post("/challenges/:id", challengeController.updateChallengeWinner);

module.exports = router;
