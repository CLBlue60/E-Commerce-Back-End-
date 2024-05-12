
// Importing necessary modules
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Get all products
router.get("/", async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const productData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "product_tags" },
      ],
    });
    // Respond with the retrieved data
    res.status(200).json(productData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Get one product by id
router.get("/:id", async (req, res) => {
  try {
    // Find a product by its id and include associated Category and Tag data
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

// Create a new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // If there are product tags, associate them with the product
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // Respond with an error if something goes wrong
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a product by id
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // If there are product tags, associate them with the product
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // Create a filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // Tags to be removed
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // Run filter & map
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // Respond with an error if something goes wrong
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a product by id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the product with the given id
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Check if product was found and deleted, then respond accordingly
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    // Respond with a success message
    res.status(200).json(productData);
  } catch (error) {
    // Respond with an error if something goes wrong
    res.status(500).json(error);
  }
});

// Exporting the router for use in other files
module.exports = router;
