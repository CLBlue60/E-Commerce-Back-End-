// Importing important parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Importing the database connection from config.js
const sequelize = require("../config/connection.js");

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for ProductTag model
ProductTag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", // Referencing the 'product' table
        key: "id", // Referencing the 'id' column in the 'product' table
        unique: false, // Allowing multiple instances of the same product_id
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag", // Referencing the 'tag' table
        key: "id", // Referencing the 'id' column in the 'tag' table
      },
    },
  },
  {
    sequelize, // Linking to the Sequelize connection
    timestamps: false, // Disabling default timestamps fields (created_at and updated_at)
    freezeTableName: true, // Freezing the table name to be the same as the model name
    underscored: true, // Using underscored naming for columns (e.g., product_id instead of productId)
    modelName: "productTag", // Setting the model name
  }
);

// Exporting the ProductTag model for use in other files
module.exports = ProductTag;
