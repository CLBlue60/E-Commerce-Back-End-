const router = require("express").Router(); // Importing Express router
const categoryRoutes = require("./category-routes"); // Importing category routes
const productRoutes = require("./product-routes"); // Importing product routes
const tagRoutes = require("./tag-routes"); // Importing tag routes

// Mounting category routes under '/categories' prefix
router.use("/categories", categoryRoutes);
// Mounting product routes under '/products' prefix
router.use("/products", productRoutes);
// Mounting tag routes under '/tags' prefix
router.use("/tags", tagRoutes);

module.exports = router; // Exporting router for use in other files
