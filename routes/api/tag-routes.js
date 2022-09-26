const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const handleError = require('../../utils/handleError');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    // get tag data with included product data for each product
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    handleError(req, res, err);
  }
});

// get a single tag by id
router.get('/:id', async (req, res) => {
  try {
    // find a single tag whose id matches the one in req.params.id, including product data
    const tagData = await Tag.findOne({ 
        where: { id: req.params.id },
        include: [{ model: Product }]
      });
    res.status(200).json(tagData);
  } catch (err) {
    handleError(req, res, err);
  }
});

// create a tag
router.post('/', async (req, res) => {
  try {
    // create a tag with the req.body, then send back a success status and the tag data
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    handleError(req, res, err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const updatedTag = await Tag.findOne({ 
    where: { id: req.params.id },
    include: [{ model: Product }]
  });
    updatedTag.update({ tag_name: req.body.tag_name });
    res.status(200).json(updatedTag);
  } catch (err) {
    handleError(req, res, err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.findOne({ 
    where: { id: req.params.id },
    include: [{ model: Product }]
  });
    deletedTag.destroy();
    res.status(200).json(deletedTag);
  } catch (err) {
    handleError(req, res, err);
  }
});

module.exports = router;
