const express = require("express");

const services = require("./config");
const db = services.db;

module.exports = (options = {}) => {
  let ChallengesCollection = db.collection("Challenges");

  const router = express.Router();

  router.get("/challenges", async (req, res) => {
    let my_challenges = [];

    let user = req.query.user;

    ChallengesCollection.where("challenger.name", "==", user)
      .get()
      .then((challengerQuerySnapshot) => {
        challengerQuerySnapshot.forEach((challengerDoc) => {
          const challengeData = challengerDoc.data();
          my_challenges.push({ id: challengerDoc.id, ...challengeData });
        });

        // Query challenges where challengee.name is equal to the given name
        ChallengesCollection.where("challengee.name", "==", user)
          .get()
          .then((challengeeQuerySnapshot) => {
            challengeeQuerySnapshot.forEach((challengeeDoc) => {
              const challengeData = challengeeDoc.data();
              my_challenges.push({ id: challengeeDoc.id, ...challengeData });
            });

            // send the results
            res.type("json").status(200).json(my_challenges);
          })
          .catch((error) => {
            console.error("Error querying challengee:", error);
          });
      })
      .catch((error) => {
        console.error("Error querying challenger:", error);
      });
  });

  router.get("/challenges/settled", async (req, res) => {
    let user_challenges = [];
    let user = req.query.user;

    ChallengesCollection.where("challenger.name", "==", user)
      .get()
      .then((challengerQuerySnapshot) => {
        challengerQuerySnapshot.forEach((challengerDoc) => {
          const challengeData = challengerDoc.data();
          user_challenges.push({ id: challengerDoc.id, ...challengeData });
        });

        // Query challenges where challengee.name is equal to the given name
        ChallengesCollection.where("challengee.name", "==", user)
          .get()
          .then((challengeeQuerySnapshot) => {
            challengeeQuerySnapshot.forEach((challengeeDoc) => {
              const challengeData = challengeeDoc.data();
              user_challenges.push({ id: challengeeDoc.id, ...challengeData });
            });

            // send the results
            res
              .type("json")
              .status(200)
              .json(
                user_challenges.filter((challenge) => challenge.isDone == true)
              );
          })
          .catch((error) => {
            console.error("Error querying challengee:", error);
          });
      })
      .catch((error) => {
        console.error("Error querying challenger:", error);
      });
  });

  router.get("/challenges/all", (req, res) => {
    try {
      ChallengesCollection.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.type("json").status(200).json(data);
      });
    } catch (error) {
      res.status(500).json({
        general: "Something went wrong, please try again",
        errorMessage: error,
      });
    }
  });

  router.get("/challenges/:id", (req, res) => {
    let challengeId = req.params.id;
    const challengeRef = ChallengesCollection.doc(challengeId);

    // Retrieve the document data
    challengeRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          res.type("json").status(200).json(data);
        } else {
          res
            .status(404)
            .json({ general: "Something went wrong, please try again" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error,
        });
      });
  });

  router.post("/challenges", (req, res) => {
    let challenge = req.body;
    ChallengesCollection.add(challenge);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.type("json").status(200).json(challenge);
  });

  // set winner and isDone
  router.post("/challenges/:id", (req, res) => {
    let name = req.body;
    let challengeId = req.params.id;
    let challenge = ChallengesCollection.doc(challengeId);

    challenge
      .update({
        winner: name,
        isDone: true,
      })
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  });

  return router;
};
