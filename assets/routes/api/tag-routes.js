const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const foundTags = await Tag.findAll({
    include: [Product]//model referenced

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
      id: req.params.id//location of alteration
    },
    include: [Product]//model referenced
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
  Tag.update(//changes tag by id
    {
      tag_name: req.body.tag_name,//what is altered
    },
    {
      where: {
        id: req.params.id,//location of alteration
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
  //Delete on tag by its `id` value
  Tag.destroy({//destroy command does its job
    where: {
      id: req.params.id,//Location of tag
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;//sends info to be required
