// utils/logger.js
function log(message, data = null) {
  console.log("🔹 " + message, data ? JSON.stringify(data, null, 2) : "");
}

module.exports = { log };
