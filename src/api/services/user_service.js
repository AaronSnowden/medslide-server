const UserModel = require("../models/user_model");

const UserService = {
  async followUser(user, follower) {
    await UserModel.followUser(user, follower);
  },

  async unfollowUser(user, follower) {
    await UserModel.unfollowUser(user, follower);
  },

  async getUserByEmail(email) {
    return await UserModel.getUserByEmail(email);
  },

  async getUserById(userId) {
    return await UserModel.getUserById(userId);
  },

  async authenticateUser(name, password) {
    return await UserModel.getUserByUsernameAndPassword(name, password);
  },

  async getAllUsers() {
    return await UserModel.getAllUsers();
  },

  async createUser(user) {
    return await UserModel.createUser(user);
  },

  async updateUser(userId, userData) {
    await UserModel.updateUser(userId, userData);
  },

  async updateUserToken(userId, fcmToken) {
    await UserModel.updateUserToken(userId, fcmToken);
  },
};

module.exports = UserService;
