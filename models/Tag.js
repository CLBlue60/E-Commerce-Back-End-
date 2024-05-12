// Importing important parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Importing the database connection from config.js
const sequelize = require("../config/connection.js");

// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for Tag model
Tag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Linking to the Sequelize connection
    timestamps: false, // Disabling default timestamps fields (created_at and updated_at)
    freezeTableName: true, // Freezing the table name to be the same as the model name
    underscored: true, // Using underscored naming for columns (e.g., tag_name instead of tagName)
    modelName: "tag", // Setting the model name
  }
);

// Exporting the Tag model for use in other files
module.exports = Tag;

module.exports = Tag; // Exporting the Tag model
