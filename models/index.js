// Importing models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Defining associations between models

// Products belong to Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // Define foreign key relationship
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id", // Define foreign key relationship
});

// Products belong to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag, // Define intermediate model
  foreignKey: "product_id", // Define foreign key relationship
});

// Tags belong to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag, // Define intermediate model
  foreignKey: "tag_id", // Define foreign key relationship
});

// Exporting models and associations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
