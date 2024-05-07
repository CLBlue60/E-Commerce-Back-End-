// Importing important parts of Sequelize library
const { Model, DataTypes } = require("sequelize");
// Importing database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model by extending off Sequelize's Model class
class Product extends Model {}

// Define fields and rules for Product model
Product.init(
  {
    // Define id field
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define product_name field
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define price field
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // Define stock field
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // Define category_id field
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  // Define options for Product model
  {
    sequelize, // Linking to the database connection
    timestamps: false, // No createdAt and updatedAt fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: "product", // Setting the model name in singular form
  }
);

module.exports = Product; // Exporting the Product model
