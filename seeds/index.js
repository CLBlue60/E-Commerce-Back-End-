// Importing seed functions for categories, products, tags, and product tags
const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

// Importing the Sequelize connection instance
const sequelize = require("../config/connection");

// Function to seed all data
const seedAll = async () => {
  // Syncing the database and forcing the creation of tables (dropping existing ones)
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  // Seeding categories
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  // Seeding products
  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  // Seeding tags
  await seedTags();
  console.log("\n----- TAGS SEEDED -----\n");

  // Seeding product tags
  await seedProductTags();
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  // Exiting the process after seeding is completed
  process.exit(0);
};

// Calling the seedAll function to start seeding data
seedAll();
