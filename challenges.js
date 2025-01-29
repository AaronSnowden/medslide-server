const express = require("express");

const services = require("./config");
const db = services.db;
const NotificationService = require("./notification-service");

module.exports = (options = {}) => {
  const notificationService = new NotificationService(db, services.fcm);

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
          const data = { id: docSnapshot.id, ...docSnapshot.data() };
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
          errorMessage: error.toString(),
        });
      });
  });

  router.post("/challenges", async (req, res) => {
    try {
      let challenge = req.body;
      ChallengesCollection.add(challenge);

      let receiverId = challenge.challengee.id;

      if (!challenge.challengeeResults == -1) {
        // Send notification
        await notificationService.sendNotification(receiverId, {
          title: "New Challenge Request!",
          body: `${challenge.challengerName} has challenged you to a ${challenge.weapon} quiz!`,
          data: challenge,
        });
        console.log("notification sent");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.type("json").status(200).json(challenge);
      }

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json").status(200).json(challenge);
    } catch (error) {
      console.error("Error creating challenge:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  // set winner and isDone
  router.post("/challenges/:id", (req, res) => {
    let name = req.body.winner;
    let challengeId = req.params.id;
    let challenge = ChallengesCollection.doc(challengeId);

    console.log(name);

    challenge
      .update({
        winner: name,
        isDone: true,
      })
      .then(() => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.type("json").status(200).json(challenge);
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  });

  return router;
};
