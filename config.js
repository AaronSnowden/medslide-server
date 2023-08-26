var admin = require("firebase-admin");

var serviceAccount = require("./med-slide-firebase-adminsdk-nkm5n-8dbb5f3644.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://med-slide-default-rtdb.firebaseio.com",
  storageBucket: "med-slide.appspot.com",
});

var db = admin.firestore();
var storage = admin.storage();

module.exports = { admin, db, storage };
