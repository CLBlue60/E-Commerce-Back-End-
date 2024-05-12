// Importing the Router module from Express.js
const router = require("express").Router();
// Importing the API routes from a separate file
const apiRoutes = require("./api");

// Attaching the API routes under the "/api" base URL
router.use("/api", apiRoutes);

// Middleware to handle routes that are not matched
router.use((req, res) => {
  // Sending a simple HTML response for unmatched routes
  res.send("<h1>Wrong Route!</h1>");
});

// Exporting the configured router for use in other files
module.exports = router;
