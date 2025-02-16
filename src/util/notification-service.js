// server/app.js

class NotificationService {
  constructor(db, fcm) {
    this.db = db;
    this.fcm = fcm;
  }
  setUtils(db, fcm) {
    this.db = db;
    this.fcm = fcm;
  }

  // check if fcmToken is valid, ie, registered, or still valid
  async checkFcmTokenValidity(token) {
    // Construct message
    const message = {
      notification: {
        title: "notification.title",
        body: "notification.body",
      },
      data: { custom_key: "value" },
      token: token,
    };

    try {
      // Await the result of sending the message
      await this.fcm.send(message);

      return true; // Return true if message is sent successfully
    } catch (error) {
      if (error.code === "messaging/registration-token-not-registered") {
        return false; // Return false if token is invalid
      }

      // Handle other errors if needed
      console.error("Error sending message:", error);
      return false; // Also return false for unknown errors
    }
  }

  // Send notification to specific user
  async sendNotification(receiverUserId, notification) {
    try {
      // Get user's FCM token from Firestore
      const userDoc = await this.db
        .collection("Users")
        .doc(receiverUserId)
        .get();

      const fcmToken = userDoc.data()?.fcmToken;
      if (!fcmToken) {
        throw new Error("User FCM token not found");
      }

      // Construct message
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: notification.data || {},
        token: fcmToken,
      };

      // Send message through FCM
      const response = await this.fcm.send(message);
      return response;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  }
}

module.exports = NotificationService;
