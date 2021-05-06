const slugify = require('slugify');

const Sub = require('models/sub');

module.exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const newSub = await new Sub({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.status(201).json(newSub);
  } catch (e) {
    console.error(e);
    res.status(500).send('Create subcategory failed');
  }
};

module.exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const subcategory = await Sub.findOne({ slug }).populate('parent');
    res.json(subcategory);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get subcategory failed');
  }
};

module.exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, parent } = req.body;
    const updated = await Sub.findOneAndUpdate(
      { slug },
      {
        $set: {
          name,
          slug: slugify(name),
          parent,
        },
      },
      { new: true },
    );
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).send('Update subcategory failed');
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const subcategoryDeleted = await Sub.findOneAndDelete({ slug });
    res.json(subcategoryDeleted);
  } catch (e) {
    console.error(e);
    res.status(500).send('Remove subcategory failed');
  }
};

module.exports.list = async (req, res) => {
  try {
    const subcategories = await Sub.find().sort({ createdAt: -1 }).populate('parent');
    res.json(subcategories);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get subcategories list failed');
  }
};
