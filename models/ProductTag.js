// Importing necessary modules
const { Model, DataTypes } = require("sequelize"); // Importing Sequelize's Model and DataTypes
const sequelize = require("../config/connection"); // Importing database connection

// Define the ProductTag model by extending Sequelize's Model class
class ProductTag extends Model {}

// Initialize the ProductTag model with defined fields and options
ProductTag.init(
  {
    // Define the id field
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the product_id field with reference to Product model
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", // Referencing the Product model
        key: "id", // Using id as the foreign key
      },
    },
    // Define the tag_id field with reference to Tag model
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag", // Referencing the Tag model
        key: "id", // Using id as the foreign key
      },
    },
  },
  {
    sequelize, // Linking to the database connection
    timestamps: false, // Disabling createdAt and updatedAt fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: "product_tag", // Setting the model name in singular form
  }
);

module.exports = ProductTag; // Exporting the ProductTag model
