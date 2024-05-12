// Importing necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js"); // Importing Sequelize connection configuration

// Defining the Tag model by extending the Sequelize Model class
class Tag extends Model {}

// Initializing the Tag model with its attributes and options
Tag.init(
  {
    // Defining the id attribute
    id: {
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // Not allowing null values
      primaryKey: true, // Setting as primary key
      autoIncrement: true, // Auto-incrementing
    },
    // Defining the tag_name attribute
    tag_name: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // Not allowing null values
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
