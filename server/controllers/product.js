const slugify = require('slugify');

const Product = require('models/product');

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.status(201).json(newProduct);
  } catch (e) {
    console.error(e);
    res.status(500).send('Create product failed');
  }
};

module.exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get product failed');
  }
};

module.exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    req.body.slug = slugify(req.body.title);
    const updated = await Product.findOneAndUpdate(
      { slug },
      { $set: req.body },
      { new: true },
    );
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).send('Update product failed');
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const productDeleted = await Product.findOneAndDelete({ slug });
    res.json(productDeleted);
  } catch (e) {
    console.error(e);
    res.status(500).send('Remove product failed');
  }
};

module.exports.list = async (req, res) => {
  try {
    const products = await Product.find().limit(req.query.limit).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).send('Get products list failed');
  }
};
