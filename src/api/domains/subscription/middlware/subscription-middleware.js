// modules/subscription/middleware/checkSubscription.js
const SubscriptionModel = require("../models/subscription.model");

const checkSubscription = async (req, res, next) => {
  try {
    const subscription = await SubscriptionModel.findOne({
      userId: req.user.id,
      status: "active",
    });

    if (!subscription) {
      return res.status(403).json({ message: "Active subscription required" });
    }

    if (new Date() > new Date(subscription.endDate)) {
      await SubscriptionModel.update(subscription.id, { status: "expired" });
      return res.status(403).json({ message: "Subscription has expired" });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkSubscription;
