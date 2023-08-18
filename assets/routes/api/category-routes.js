const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const foundCategories = await Category.findAll({
    include: [Product]

  })
  if (!foundCategories){
    return res.status(400).json({
      message: "Cannot find categories."
    })
  }
  return res.status(200).json(foundCategories)

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const foundID = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  if (!foundID){
    return res.status(400).json({
      message: "Cannot find ID."
    })
  }
  return res.status(200).json(foundID)
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((category) => {
    res.json(category);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log("Nothing.")
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  ).then((updatedCat) => {
    res.json(updatedCat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCat) => {
      res.json(deletedCat);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
