const { v4: uuidv4 } = require("uuid");
const SubscriptionModel = require("../models/subscription_model");
const mtnMoneyService = require("./mtn_money_service");
const airtelMoneyService = require("./airtel_money_service");
const services = require("../../config/config.js");
const admin = services.admin;

class SubscriptionService {
  async checkSubscriptionStatus(userId) {
    try {
      const subscription = await SubscriptionModel.getUserActiveSubscription(
        userId
      );

      if (!subscription) {
        return {
          isActive: false,
          message: "No active subscription found",
        };
      }

      // Convert Firestore Timestamp to JavaScript Date
      const endDate = subscription.endDate.toDate();
      const now = new Date();

      // Check if subscription has expired
      if (now > endDate) {
        await SubscriptionModel.updateStatus(subscription.id, "expired");
        return {
          isActive: false,
          message: "Subscription expired",
          expiredAt: endDate,
        };
      }

      // Calculate remaining days
      const remainingDays = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

      return {
        isActive: true,
        subscriptionId: subscription.id,
        plan: subscription.plan,
        startDate: subscription.startDate.toDate(),
        endDate: endDate,
        remainingDays,
        autoRenew: subscription.autoRenew || false,
        paymentMethod: subscription.provider,
        lastPayment: {
          amount: subscription.amount,
          date: subscription.startDate.toDate(),
          transactionId: subscription.transactionId,
        },
      };
    } catch (error) {
      console.error("Error checking subscription status:", error);
      throw error;
    }
  }

  async getSubscriptionHistory(userId) {
    try {
      const subscriptions = await SubscriptionModel.getSubscriptionHistory(
        userId
      );

      return subscriptions.map((sub) => ({
        subscriptionId: sub.id,
        plan: sub.plan,
        status: sub.status,
        startDate: sub.startDate.toDate(),
        endDate: sub.endDate.toDate(),
        amount: sub.amount,
        provider: sub.provider,
        transactionId: sub.transactionId,
      }));
    } catch (error) {
      console.error("Error getting subscription history:", error);
      throw error;
    }
  }

  async createSubscription(userId, planId, amount, phoneNumber, provider) {
    const reference = uuidv4();
    let paymentService;

    // Select payment service based on provider
    switch (provider.toLowerCase()) {
      case "mtn":
        paymentService = mtnMoneyService;
        break;
      case "airtel":
        paymentService = airtelMoneyService;
        break;
      default:
        throw new Error("Invalid payment provider");
    }

    // Initiate payment
    const payment = await paymentService.initiatePayment(
      phoneNumber,
      amount,
      reference
    );

    // Create subscription record
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const subscription = await SubscriptionModel.create({
      userId,
      plan: planId,
      amount,
      transactionId: payment.transactionId,
      provider: provider.toLowerCase(),
      status: "pending",
      phoneNumber,
      endDate: admin.firestore.Timestamp.fromDate(endDate),
    });

    if (payment.transactionId) {
      this.handlePaymentCallback(payment.transactionId, "successful");
    }
    return {
      subscriptionId: subscription.id,
      transactionId: payment.transactionId,
    };
  }

  async handlePaymentCallback(transactionId, status) {
    const subscription = await SubscriptionModel.findByTransactionId(
      transactionId
    );
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const newStatus =
      status.toLowerCase() === "successful" ? "active" : "failed";
    return await SubscriptionModel.updateStatus(subscription.id, newStatus);
    // update user status
  }

  async checkPaymentStatus(transactionId, provider) {
    let paymentService;

    switch (provider.toLowerCase()) {
      case "mtn":
        paymentService = mtnMoneyService;
        break;
      case "airtel":
        paymentService = airtelMoneyService;
        break;
      default:
        throw new Error("Invalid payment provider");
    }

    return await paymentService.checkPaymentStatus(transactionId);
  }
}

module.exports = new SubscriptionService();
