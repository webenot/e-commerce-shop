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
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    res.json(category);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get category failed');
  }
};

module.exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const updated = await Category.findOneAndUpdate(
      { slug },
      {
        $set: {
          name,
          slug: slugify(name),
        },
      },
      { new: true },
    );
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).send('Update category failed');
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const categoryDeleted = await Category.findOneAndDelete({ slug });
    res.json(categoryDeleted);
  } catch (e) {
    console.error(e);
    res.status(500).send('Remove category failed');
  }
};

module.exports.list = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get categories list failed');
  }
};
