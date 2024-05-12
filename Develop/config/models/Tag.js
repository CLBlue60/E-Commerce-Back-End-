// Importing necessary modules
const { Model, DataTypes } = require("sequelize"); // Importing Sequelize's Model and DataTypes
const sequelize = require("../config/connection"); // Importing database connection

// Define the Tag model by extending Sequelize's Model class
class Tag extends Model {}

// Initialize the Tag model with defined fields and options
Tag.init(
  {
    // Define the id field
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the tag_name field
    tag_name: {
      type: DataTypes.STRING, // No constraints defined for tag_name
    },
  },
  {
    sequelize, // Linking to the database connection
    timestamps: false, // Disabling createdAt and updatedAt fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: "tag", // Setting the model name in singular form
  }
);

module.exports = Tag; // Exporting the Tag model
