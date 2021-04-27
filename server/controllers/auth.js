const User = require('models/user');

const currentUser = async (req, res) => {
  if (req.user) {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
      return;
    }
  }
  res.status(404).json({ err: 'No such user' });
};

const createOrUpdateUser = async (req, res) => {
  if (req.user) {
    const {
      email,
      name,
      picture,
    } = req.user;
    const userName = name ? name : email.split('@')[0];
    const user = await User.findOneAndUpdate(
      { email },
      {
        name: userName,
        picture,
      },
      { new: true },
    );
    if (user) {
      res.json(user);
      return;
    }

    const newUser = await new User({
      email,
      name: userName,
      picture,
    }).save();
    res.json(newUser);
    return;
  }
  res.status(401).json({ err: 'No such user' });
};

module.exports = {
  currentUser,
  createOrUpdateUser,
};
