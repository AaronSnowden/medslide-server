const UserService = require("../services/user_service");

const UserController = {
  async followUser(req, res) {
    try {
      const { user, follower } = req.body;
      await UserService.followUser(user, follower);
      res.status(200).json({ message: "Followed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error following user", error: error.toString() });
    }
  },

  async unfollowUser(req, res) {
    try {
      const { user, follower } = req.body;
      await UserService.unfollowUser(user, follower);
      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error unfollowing user", error: error.toString() });
    }
  },

  async getUserByEmail(req, res) {
    try {
      const email = req.query.email;
      const user = await UserService.getUserByEmail(email);
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving user", error: error.toString() });
    }
  },

  async authenticateUser(req, res) {
    try {
      const { name, password } = req.query;
      const user = await UserService.authenticateUser(name, password);
      user
        ? res.status(200).json(user)
        : res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({
        message: "Error authenticating user",
        error: error.toString(),
      });
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await UserService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.toString() });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving users", error: error.toString() });
    }
  },

  async createUser(req, res) {
    try {
      const user = req.body;
      const newUser = await UserService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.toString() });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const newUser = req.body;
      await UserService.updateUser(userId, newUser);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.toString() });
    }
  },

  async updateUserToken(req, res) {
    try {
      const { userId, fcmToken } = req.body;
      await UserService.updateUserToken(userId, fcmToken);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = UserController;
