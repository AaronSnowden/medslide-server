require("dotenv").config();
var admin = require("firebase-admin");

var serviceAccount = require("./med-slide-firebase-adminsdk-nkm5n-8dbb5f3644.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.APP_BASE_URL,
  storageBucket: process.env.APP_BUCKET_URL,
});

var db = admin.firestore();
var storage = admin.storage();
var fcm = admin.messaging();
var rtdb = admin.database();

module.exports = { admin, db, storage, fcm, rtdb };
