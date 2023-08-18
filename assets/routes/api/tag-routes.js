const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const foundTags = await Tag.findAll({
    include: [Product]

  })
  if (!foundTags){
    return res.status(400).json({
      message: "Cannot find categories."
    })
  }
  return res.status(200).json(foundTags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const foundID = await Tag.findOne({
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
  // create a new tag
  Tag.create(req.body).then((newTag) => {
    res.json(newTag);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  ).then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
