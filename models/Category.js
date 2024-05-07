// Importing necessary modules
const { Model, DataTypes } = require("sequelize"); // Importing Sequelize's Model and DataTypes
const sequelize = require("../config/connection.js"); // Importing database connection

// Define the Category model by extending Sequelize's Model class
class Category extends Model {}

// Initialize the Category model with defined fields and options
Category.init(
  {
    // Define the id field
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the category_name field
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Linking to the database connection
    timestamps: false, // Disabling createdAt and updatedAt fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: "category", // Setting the model name in singular form
  }
);

module.exports = Category; // Exporting the Category model
