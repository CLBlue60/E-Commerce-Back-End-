// Importing required modules
const express = require("express"); // Express.js framework
const routes = require("./routes"); // Routes configuration
// Importing sequelize connection (assuming it's done in './config/connection')

// Creating an Express application instance
const app = express();
// Setting the port number for the server to listen on
const PORT = process.env.PORT || 3001; // Default port is 3001, but can be overridden by environment variable

// Middleware setup
app.use(express.json()); // Parsing JSON requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded requests

// Mounting routes
app.use(routes); // Using defined routes

// Starting the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); // Logging server start message
});
