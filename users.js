const express = require("express");
const services = require("./config");
const db = services.db;
const admin = services.admin;

module.exports = (options = {}) => {
  const UsersCollection = db.collection("Users");

  const router = express.Router();

  // sign in user with userName and Password
  router.get("/users", (req, res) => {
    let query = req.query;
    let userName = query.name;
    let password = query.password;

    let _payLoad = [];

    // Query users with the given username
    UsersCollection.where("name", "==", userName)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("User not found");
        } else {
          // Assume only one user matches the username (you should handle cases where multiple users match)
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const userId = userDoc.id;

          // Now, you can compare the password (in a real application, you should use proper password hashing)
          if (userData.password === password) {
            return res
              .type("json")
              .status(200)
              .json({ id: userId, ...userData });
          } else {
            res.status(500).json({
              general: "Something went wrong, please try again",
              errorMessage: error,
            });
          }
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error,
        });
      });
  });

  // get all users
  router.get("/users/all", async (req, res) => {
    try {
      UsersCollection.get().then((snapshot) => {
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

  //add new user
  router.post("/users", async (req, res) => {
    let user = req.body;
    let userRef = await UsersCollection.add(user);
    const data = { id: userRef.id, ...user };
    res.type("json").status(200).json(data);
  });

  // get single user
  router.get("/users/:id", (req, res) => {
    let userId = req.params.id;
    const userRef = UsersCollection.doc(userId);

    // Retrieve the document data
    userRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = { id: docSnapshot.id, ...docSnapshot.data() };
          res.type("json").status(200).json(data);
        } else {
          res.status(404).json({ general: "Not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error.toString(),
        });
      });
  });

  // update user
  router.post("/users/:id", (req, res) => {
    let newUser = req.body;
    let userId = req.params.id;
    const userRef = UsersCollection.doc(userId);

    userRef
      .update(newUser)
      .then((docSnapshot) => {
        res.status(200).json({
          general: "User updated successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          general: "Something went wrong, please try again",
          errorMessage: error.toString(),
        });
      });
  });

  // follow
  router.post("/users/follow", async (req, res) => {
    try {
      const user = req.body.user; // User being followed
      const follower = req.body.follower; // Follower

      // Get document references
      const userBeingFollowedRef = UsersCollection.doc(user.id);

      const followerRef = UsersCollection.doc(follower.id);

      // Update userBeingFollowed's followers list
      await userBeingFollowedRef.update({
        followers: admin.firestore.FieldValue.arrayUnion(follower.name),
      });

      // Update follower's followees list
      await followerRef.update({
        followees: admin.firestore.FieldValue.arrayUnion(user.name),
      });

      res.status(200).json({ message: "Success" }); // Send a response indicating success
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Error occurred" }); // Send an error response
    }
  });

  // unfollow
  router.post("/users/unfollow", async (req, res) => {
    try {
      const user = req.body.user; // User being followed
      const follower = req.body.follower; // Follower

      // Get document references
      const userBeingFollowedRef = UsersCollection.doc(user.id);

      const followerRef = UsersCollection.doc(follower.id);

      // Update userBeingFollowed's followers list
      await userBeingFollowedRef.update({
        followers: admin.firestore.FieldValue.arrayRemove(follower.name),
      });

      // Update follower's followees list
      await followerRef.update({
        followees: admin.firestore.FieldValue.arrayRemove(user.name),
      });

      res.status(200).json({ message: "Success" }); // Send a response indicating success
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Error occurred" }); // Send an error response
    }
  });

  return router;
};
