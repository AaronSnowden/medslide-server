const { json } = require("express");
const { ChallengesCollection } = require("../models/challenge_model");

function parseNestedJSON(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      try {
        const parsed = JSON.parse(obj[key]);
        if (typeof parsed === "object" && parsed !== null) {
          obj[key] = parsed;
        }
      } catch (error) {
        // If parsing fails, keep it as a string
      }
    }
  }
  return obj;
}

// Get all challenges
async function getAllChallenges() {
  const snapshot = await ChallengesCollection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get challenges by user
async function getUserChallenges(user) {
  let my_challenges = [];

  const challengerQuerySnapshot = await ChallengesCollection.where(
    "challenger.email",
    "==",
    user
  ).get();

  challengerQuerySnapshot.forEach((doc) => {
    my_challenges.push({ id: doc.id, ...doc.data() });
  });

  const challengeeQuerySnapshot = await ChallengesCollection.where(
    "challengee.email",
    "==",
    user
  ).get();
  challengeeQuerySnapshot.forEach((doc) => {
    my_challenges.push({ id: doc.id, ...doc.data() });
  });

  return my_challenges;
}

// Get settled challenges
async function getSettledChallenges(user) {
  const challenges = await getUserChallenges(user);
  return challenges.filter((challenge) => challenge.isDone === true);
}

// Get challenge by ID
async function getChallengeById(challengeId) {
  const doc = await ChallengesCollection.doc(challengeId).get();
  if (!doc.exists) throw new Error("Challenge not found");
  return { id: doc.id, ...doc.data() };
}

// Create a challenge
async function createChallenge(challenge, notificationService) {
  await ChallengesCollection.add(parseNestedJSON(challenge));
  const receiverId = JSON.parse(challenge.challengee).id;

  if (challenge.challengeeResults != -1) {
    await notificationService.sendNotification(receiverId, {
      title: "New Challenge Request!",
      body: `${JSON.parse(challenge.challenger).name} has challenged you to a ${
        challenge.weapon
      } quiz!`,
      data: challenge,
    });
  }

  return challenge;
}

// Update challenge winner
async function updateChallengeWinner(challengeId, winner) {
  await ChallengesCollection.doc(challengeId).update({
    winner,
    isDone: true,
  });

  return { message: "Challenge updated successfully", challengeId };
}

module.exports = {
  getAllChallenges,
  getUserChallenges,
  getSettledChallenges,
  getChallengeById,
  createChallenge,
  updateChallengeWinner,
};
