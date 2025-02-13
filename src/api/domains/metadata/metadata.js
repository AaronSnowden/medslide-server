const services = require("../../../config/config");
const db = services.rtdb;

async function getAppMetadata() {
  try {
    const node = "metadata"; // Specify the node in the database
    const snapshot = await db.ref(node).once("value");

    if (!snapshot.exists()) {
      return { error: "No data found" };
    }
    return snapshot.val();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Internal Server Error" }; // Ensure a proper error response
  }
}

module.exports = getAppMetadata;
