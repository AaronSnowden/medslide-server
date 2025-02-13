// domains/users/index.js
const userService = require("../../services/user_service.js");
const userController = require("../../controllers/user_controller.js");
const userRoutes = require("./routes");

module.exports = {
  userService,
  userController,
  userRoutes,
};
