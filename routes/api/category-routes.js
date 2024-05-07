const router = require("express").Router(); // Importing Express router
const { Category, Product } = require("../../models"); // Importing Category and Product models

// The `/api/categories` endpoint

// GET route to retrieve all categories with associated products
router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"], // Specify attributes to retrieve
    include: [
      {
        model: Product, // Include the Product model
        attributes: ["id", "product_name", "price", "stock", "category_id"], // Specify Product attributes to retrieve
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData)) // Respond with JSON containing category data
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// GET route to retrieve a specific category by its ID with associated products
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id, // Find category by ID parameter
    },
    attributes: ["id", "category_name"], // Specify attributes to retrieve
    include: [
      {
        model: Product, // Include the Product model
        attributes: ["id", "product_name", "price", "stock", "category_id"], // Specify Product attributes to retrieve
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id" }); // If no category found, respond with 404 and message
        return;
      }
      res.json(dbCategoryData); // Respond with JSON containing category data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// POST route to create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name, // Create category with provided category_name from request body
  })
    .then((dbCategoryData) => res.json(dbCategoryData)) // Respond with JSON containing created category data
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// PUT route to update a category by its ID
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id, // Update category with matching ID parameter
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: "No category found with this id" }); // If no category found, respond with 404 and message
        return;
      }
      res.json(dbCategoryData); // Respond with JSON containing updated category data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// DELETE route to delete a category by its ID
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id, // Delete category with matching ID parameter
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id" }); // If no category found, respond with 404 and message
        return;
      }
      res.json(dbCategoryData); // Respond with JSON containing deleted category data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

module.exports = router; // Export router for use in other files
