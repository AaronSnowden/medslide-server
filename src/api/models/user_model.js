const services = require("../../config/config.js");
const db = services.db;
const admin = services.admin;

const UsersCollection = db.collection("Users");

const UserModel = {
  async followUser(user, follower) {
    const userBeingFollowedRef = UsersCollection.doc(user.id);
    const followerRef = UsersCollection.doc(follower.id);

    await userBeingFollowedRef.update({
      followers: admin.firestore.FieldValue.arrayUnion(follower.name),
    });

    await followerRef.update({
      followees: admin.firestore.FieldValue.arrayUnion(user.name),
    });
  },

  async unfollowUser(user, follower) {
    const userBeingFollowedRef = UsersCollection.doc(user.id);
    const followerRef = UsersCollection.doc(follower.id);

    await userBeingFollowedRef.update({
      followers: admin.firestore.FieldValue.arrayRemove(follower.name),
    });

    await followerRef.update({
      followees: admin.firestore.FieldValue.arrayRemove(user.name),
    });
  },

  async getUserByEmail(email) {
    const querySnapshot = await UsersCollection.where(
      "email",
      "==",
      email
    ).get();
    return querySnapshot.empty
      ? null
      : { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
  },

  async getUserById(userId) {
    const userDoc = await UsersCollection.doc(userId).get();
    return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
  },

  async getUserByUsernameAndPassword(name, password) {
    const querySnapshot = await UsersCollection.where("name", "==", name).get();
    if (querySnapshot.empty) return null;

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return userData.password === password
      ? { id: userDoc.id, ...userData }
      : null;
  },

  async getAllUsers() {
    const snapshot = await UsersCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async createUser(user) {
    const userRef = await UsersCollection.add(user);
    return { id: userRef.id, ...user };
  },

  async updateUser(userId, userData) {
    await UsersCollection.doc(userId).update(userData);
  },

  async updateUserToken(userId, fcmToken) {
    await UsersCollection.doc(userId).update({ fcmToken });
  },
};

module.exports = UserModel;
