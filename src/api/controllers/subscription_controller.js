const subscriptionService = require("../services/subscription_service");

class SubscriptionController {
  async checkStatus(req, res) {
    try {
      const { userId } = req.params;
      const status = await subscriptionService.checkSubscriptionStatus(userId);
      res.json(status);
    } catch (error) {
      console.error("Error checking status:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getHistory(req, res) {
    try {
      const { userId } = req.params;
      const history = await subscriptionService.getSubscriptionHistory(userId);
      res.json({
        success: true,
        history,
      });
    } catch (error) {
      console.error("Error getting history:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async subscribe(req, res) {
    try {
      const { userId, planId, amount, phoneNumber, provider } = req.body;

      const result = await subscriptionService.createSubscription(
        userId,
        planId,
        amount,
        phoneNumber,
        provider
      );

      res.json({ success: true, ...result });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async handleCallback(req, res) {
    try {
      const { transaction_id, status } = req.body;
      await subscriptionService.handlePaymentCallback(transaction_id, status);
      res.json({ success: true });
    } catch (error) {
      console.error("Callback error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async checkStatus(req, res) {
    try {
      const { transactionId, provider } = req.params;
      const status = await subscriptionService.checkPaymentStatus(
        transactionId,
        provider
      );
      res.json({ status });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new SubscriptionController();
