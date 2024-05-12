// Importing required modules and files
const { Model, DataTypes } = require("sequelize"); // Importing Sequelize's Model and DataTypes
const sequelize = require("../config/connection.js"); // Importing Sequelize connection configuration

// Defining the Category model, extending Sequelize's Model class
class Category extends Model {}

// Initializing the Category model with its attributes and options
Category.init(
  {
    // Defining the id attribute
    id: {
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // Not allowing null values
      primaryKey: true, // Setting as primary key
      autoIncrement: true, // Auto-incrementing
    },
    // Defining the category_name attribute
    category_name: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // Not allowing null values
    },
  },
  {
    // Linking to the Sequelize connection
    sequelize,
    // Disabling default timestamps fields (created_at and updated_at)
    timestamps: false,
    // Freezing the table name to be the same as the model name
    freezeTableName: true,
    // Using underscored naming for columns (e.g., category_name instead of categoryName)
    underscored: true,
    // Setting the model name
    modelName: "category",
  }
);

// Exporting the Category model for use in other files
module.exports = Category;
