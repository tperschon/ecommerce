const router = require('express').Router();
const { Category, Product } = require('../../models');
const handleError = require('../../utils/handleError');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    // get all categories including their products data
    const categoryData = await Category.findAll({ include: { model: Product }});
    // send status 200 and the data to client
    res.status(200).json(categoryData);
  } catch (err) {
    handleError(req, res, err);
  }
});

// find one category by its `id` value, including its products data
router.get('/:id', async (req, res) => {
  try {
    // get one category including its products
    const singleCategory = await Category.findOne({ 
      where: { id: req.params.id },
      include: { model: Product }
    });
    // send status 200 and the data to client
    res.status(200).json(singleCategory);
  } catch (err) {
    handleError(req, res, err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    // create the category using req.body
    const createdCategory = await Category.create(req.body);
    // send status 200 and the data to client
    res.status(200).json(createdCategory);
  } catch (err) {
    handleError(req, res, err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // first find the category
    const updatedCategory = await Category.findOne({ where: { id: req.params.id }});
    // update the name with the req.body.category_name
    updatedCategory.update({ category_name: req.body.category_name });
    // send status 200 and the data to client
    res.status(200).json(updatedCategory);
  } catch (err) {
    handleError(req, res, err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // first find the category
    const deletedCategory = await Category.findOne({ where: { id: req.params.id }});
    // delete the category
    deletedCategory.destroy();
    // send status 200 and the data to client
    res.status(200).json(deletedCategory);
  } catch (err) {
    handleError(req, res, err);
  }
});

module.exports = router;
