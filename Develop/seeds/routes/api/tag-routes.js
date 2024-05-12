// Importing necessary modules
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tags
// Include associated Product data
router.get("/", async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tag_products" }],
    });
    // Respond with the retrieved data
    res.status(200).json(tagData);
  } catch (err) {
    // Respond with an error if something goes wrong
    res.status(500).json(err);
  }
});

// Get one tag by id
// Include associated Product data
router.get("/:id", async (req, res) => {
  try {
    // Find a tag by its id and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tag_products" }],
    });
    // Check if tag was found, then respond accordingly
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    // Respond with the retrieved tag data
    res.status(200).json(tagData);
  } catch (err) {
    // Respond with an error if something goes wrong
    res.status(500).json(err);
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    // Create a new tag with the provided tag_name
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    // Log success message and respond with the newly created tag
    console.log("New tag successfully created.");
    res.status(200).json(tagData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(400).json(error);
  }
});

// Update the name of a tag by ID
router.put("/:id", async (req, res) => {
  try {
    // Update the tag_name of the tag with the given id
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // Check if tag was found and updated, then respond accordingly
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    // Log success message and respond with the updated tag data
    console.log("Tag successfully updated.");
    res.status(200).json(tagData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Delete a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete the tag with the given id
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Check if tag was found and deleted, then respond accordingly
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    // Respond with a success message
    res.status(200).json(tagData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Exporting the router for use in other files
module.exports = router;
