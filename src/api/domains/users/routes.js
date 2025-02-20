const express = require("express");
const UserController = require("../../controllers/user_controller.js");

const router = express.Router();

router.post("/users/follow", UserController.followUser);
router.post("/users/unfollow", UserController.unfollowUser);
router.get("/users/email", UserController.getUserByEmail);
router.get("/users", UserController.authenticateUser);
router.get("/users/all", UserController.getAllUsers);
router.post("/users", UserController.createUser);
router.post("/users/:id", UserController.updateUser);
router.get("/users/:id", UserController.getUser);
router.post("/user/token", UserController.updateUserToken);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
