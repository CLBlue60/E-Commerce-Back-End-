// Importing models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Defining associations between models

// Products belongs to Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // Foreign key column in the Product table
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id", // Foreign key column in the Product table
});

// Products belong to many Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: { model: ProductTag, unique: false }, // Junction table
  as: "product_tags", // Alias for the Tag association
});

// Tags belong to many Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: { model: ProductTag, unique: false }, // Junction table
  as: "tag_products", // Alias for the Product association
});

// Exporting models and associations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
