const express = require("express");
const router = express.Router();
const subscriptionController = require("../../controllers/subscription_controller.js");

router.post("/subscribe", subscriptionController.subscribe);
router.post("/callback", subscriptionController.handleCallback);
router.get(
  "/status/:transactionId/:provider",
  subscriptionController.checkStatus
);
router.get("/status/:userId", subscriptionController.checkStatus);
router.get("/history/:userId", subscriptionController.getHistory);

module.exports = router;
