// Importing required modules
require("dotenv").config(); // dotenv for loading environment variables
const Sequelize = require("sequelize"); // Sequelize for database ORM

// Creating a Sequelize instance for database connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL) // If a DB URL is provided, use it directly
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        // If no DB URL provided, create connection with individual parameters
        host: "localhost", // Database host
        dialect: "postgres", // Dialect of the database
        dialectOptions: {
          decimalNumbers: true, // Option for decimal numbers
        },
      }
    );

module.exports = sequelize; // Exporting the Sequelize instance for use in other files
