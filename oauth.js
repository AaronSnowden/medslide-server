const { GoogleAuth } = require("google-auth-library");
const { get } = require("https");
const path = require("path");

async function getOAuthToken() {
  try {
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
      keyFile: path.join(
        __dirname,
        "./med-slide-firebase-adminsdk-nkm5n-8dbb5f3644.json"
      ), // Yo
    });

    const client = await auth.getClient();
    const { token } = await client.getAccessToken();

    console.log("OAuth Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
  }
}

// Run it
// getOAuthToken();

module.exports = getOAuthToken;
