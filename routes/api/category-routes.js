const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const foundCategories = await Category.findAll({//general search
    include: [Product]//includes model

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
  const foundID = await Category.findOne({//narrows search
    where: {
      id: req.params.id//scope of the GET
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
    res.json(category);//uses create command - remember to use lowercase for 'create'
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log("Nothing.")
  Category.update(//references correct model
    {
      category_name: req.body.category_name,//altered information
    },
    {
      where: {
        id: req.params.id,//targets correct ID
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
  //Deleting a category by its `id` value
  Category.destroy({//destroy command targets "where" in work scope
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCat) => {//named variable to express output
      res.json(deletedCat);
    })
    .catch((err) => res.json(err));
});

module.exports = router;//sends info to be required
