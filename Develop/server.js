// Importing required modules and files
const express = require("express"); // Importing Express.js framework
const routes = require("./routes"); // Importing routes from separate file
const sequelize = require("./config/connection"); // Importing Sequelize connection

// Creating an Express application
const app = express();

// Defining the port number, using the environment variable PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Attaching defined routes to the Express application
app.use(routes);

// Syncing Sequelize models to the database and starting the server
sequelize.sync({ force: true }).then(() => {
  // Once sync is complete, start the server and listen on the defined port
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
