const router = require("express").Router(); // Importing Express router
const apiRoutes = require("./api"); // Importing API routes

router.use("/api", apiRoutes); // Mounting API routes under '/api' prefix

// Default route for handling incorrect routes
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>"); // Sending HTML response for incorrect routes
});

module.exports = router; // Exporting router for use in other files
