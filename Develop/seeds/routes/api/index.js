// Importing the Router module from Express.js
const router = require("express").Router();
// Importing the category, product, and tag routes from separate files
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const tagRoutes = require("./tagRoutes");

// Attaching category, product, and tag routes under their respective base URLs
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);

// Exporting the configured router for use in other files
module.exports = router;
