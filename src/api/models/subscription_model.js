const services = require("../../config/config.js");
const db = services.db;
const admin = services.admin;

class SubscriptionModel {
  constructor() {
    this.collection = db.collection("subscriptions");
  }

  async getUserActiveSubscription(userId) {
    try {
      const snapshot = await this.collection
        .where("userId", "==", userId)
        .where("status", "==", "active")
        .orderBy("startDate", "desc")
        .limit(1)
        .get();

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error("Error getting user subscription:", error);
      throw error;
    }
  }

  async getSubscriptionHistory(userId) {
    try {
      const snapshot = await this.collection
        .where("userId", "==", userId)
        .orderBy("startDate", "desc")
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting subscription history:", error);
      throw error;
    }
  }

  async create(subscriptionData) {
    const docRef = await this.collection.add({
      ...subscriptionData,
      startDate: admin.firestore.Timestamp.now(),
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  async findByTransactionId(transactionId) {
    const snapshot = await this.collection
      .where("transactionId", "==", transactionId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async updateStatus(id, status) {
    await this.collection.doc(id).update({
      status,
      updatedAt: admin.firestore.Timestamp.now(),
    });
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() };
  }
}

module.exports = new SubscriptionModel();
