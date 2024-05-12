// Importing important parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Importing the database connection from config.js
const sequelize = require("../config/connection.js");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL, // Data type is DECIMAL
      allowNull: false, // Not allowing null values
      validate: {
        isDecimal: true, // Validating that it is a decimal value
      },
    },
    in_stock: {
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // Not allowing null values
      defaultValue: 10, // Default value is 10
      validate: {
        isNumeric: true, // Validating that it is a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // Not allowing null values
      // Establishing a foreign key relationship with the category table
      references: {
        model: "category", // Referencing the 'category' table
        key: "id", // Referencing the 'id' column in the 'category' table
      },
    },
  },
  {
    sequelize, // Linking to the Sequelize connection
    timestamps: false, // Disabling default timestamps fields (created_at and updated_at)
    freezeTableName: true, // Freezing the table name to be the same as the model name
    underscored: true, // Using underscored naming for columns (e.g., product_name instead of productName)
    modelName: "product", // Setting the model name
  }
);

// Exporting the Product model for use in other files
module.exports = Product;
