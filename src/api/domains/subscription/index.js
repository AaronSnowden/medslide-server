// modules/subscription/index.js
const subscriptionService = require("./services/subscription.service");
const subscriptionController = require("./controllers/subscription.controller");
const subscriptionRoutes = require("./routes/subscription.routes");

module.exports = {
  subscriptionService,
  subscriptionController,
  subscriptionRoutes,
};
