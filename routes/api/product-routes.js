const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const handleError = require('../../utils/handleError');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // get product data with included category/tag data for each product
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } catch (err) {
    handleError(req, res, err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product whose id matches the one in req.params.id, including category/tag data
    const productData = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } catch (err) {
    handleError(req, res, err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id
        };
      });
      const productTags = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json({ product: newProduct, tags: productTags });
    } else res.status(200).json(newProduct);
  } catch (err) {
    handleError(req, res, err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
    // create object to update product with, ternaries to fill in with request data if it exists or just use existing product data otherwise
    const updateData = {
      product_name: req.body.product_name ? req.body.product_name : updatedProduct.product_name,
      price: req.body.price ? req.body.price : updatedProduct.price,
      stock: req.body.stock ? req.body.stock : updatedProduct.stock,
      category_id: req.body.category_id ? req.body.category_id : updatedProduct.category_id
    };
    // await updating product
    await updatedProduct.update(updateData);
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    // run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.json(updatedProductTags)
  } catch (err) {
    handleError(req, res, err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value, send the deleted product back on success
  try {
    // find the product to delete, we do this instead of just Product.destroy so we can send back the deleted product data
    const deletedProduct = await Product.findOne({
      where: { id: req.params.id }
    });
    // delete the product and send back a successful status with the deleted product data
    deletedProduct.destroy();
    res.status(200).json(deletedProduct);
  } catch (err) {
    handleError(req, res, err);
  }
});

module.exports = router;
