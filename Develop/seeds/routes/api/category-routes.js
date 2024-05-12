// Importing the Router module from Express.js
const router = require("express").Router();
// Importing the Category and Product models
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get all categories
router.get("/", async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with the retrieved data
    res.status(200).json(categoryData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Add a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category with the provided category_name
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    // Log success message and respond with the newly created category
    console.log("New category successfully created.");
    res.status(200).json(categoryData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(400).json(error);
  }
});

// Update a category by id
router.put("/:id", async (req, res) => {
  try {
    // Update the category_name of the category with the given id
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // Check if category was found and updated, then respond accordingly
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    console.log("Category successfully updated.");
    res.status(200).json(categoryData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Delete a category by id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the category with the given id
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Check if category was found and deleted, then respond accordingly
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    console.log("Category successfully deleted.");
    res.status(200).json(categoryData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Find a product by id
router.get("/:id", async (req, res) => {
  try {
    // Find a product by its id and include associated Category and Tags
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "product_tags" },
      ],
    });
    // Check if product was found, then respond accordingly
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    // Respond with the retrieved product data
    res.status(200).json(productData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Exporting the router for use in other files
module.exports = router;
