const slugify = require('slugify');

const Category = require('models/category');

module.exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).json(newCategory);
  } catch (e) {
    console.error(e);
    res.status(500).send('Create category failed');
  }
};

module.exports.read = async (req, res) => {

};

module.exports.update = async (req, res) => {

};

module.exports.remove = async (req, res) => {

};

module.exports.list = async (req, res) => {

};
