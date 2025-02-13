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
