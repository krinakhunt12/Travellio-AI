const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const masterRoute = require("./routes/masterRoute.js");

dotenv.config();

// Debug: Check if API key is loaded
console.log('GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'Yes (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No - NOT FOUND!');

const app = express();
// Configure CORS to allow credentialed requests from the frontend dev server.
// When `fetch` uses `credentials: 'include'`, the server must not respond with
// Access-Control-Allow-Origin: '*'. Using `origin: true` echoes the request origin.
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Only keep the master orchestrator route used by the frontend
app.use("/api/master", masterRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
