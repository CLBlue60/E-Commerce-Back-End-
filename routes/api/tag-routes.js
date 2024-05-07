const router = require("express").Router(); // Importing Express router
const { Tag, Product, ProductTag } = require("../../models"); // Importing Tag, Product, and ProductTag models

// The `/api/tags` endpoint

// GET route to retrieve all tags with associated product data
router.get("/", (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"], // Specify attributes to retrieve
    include: [
      {
        model: Product, // Include the Product model
        attributes: ["id", "product_name", "price", "stock", "category_id"], // Specify Product attributes to retrieve
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData)) // Respond with JSON containing tag data
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// GET route to retrieve a specific tag by its ID with associated product data
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id, // Find tag by ID parameter
    },
    attributes: ["id", "tag_name"], // Specify attributes to retrieve
    include: [
      {
        model: Product, // Include the Product model
        attributes: ["id", "product_name", "price", "stock", "category_id"], // Specify Product attributes to retrieve
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" }); // If no tag found, respond with 404 and message
        return;
      }
      res.json(dbTagData); // Respond with JSON containing tag data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// POST route to create a new tag
router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name, // Create tag with provided tag_name from request body
  })
    .then((dbTagData) => res.json(dbTagData)) // Respond with JSON containing created tag data
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// PUT route to update a tag's name by its ID
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id, // Update tag with matching ID parameter
    },
  })
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: "No tag found with this id" }); // If no tag found, respond with 404 and message
        return;
      }
      res.json(dbTagData); // Respond with JSON containing updated tag data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

// DELETE route to delete a tag by its ID
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id, // Delete tag with matching ID parameter
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" }); // If no tag found, respond with 404 and message
        return;
      }
      res.json(dbTagData); // Respond with JSON containing deleted tag data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Respond with status 500 and error message
    });
});

module.exports = router; // Export router for use in other files
