const admin = require('firebase');

const User = require('models/user');

const authCheck = async (req, res, next) => {
  try {
    req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

const adminCheck = async (req, res, next) => {
  if (req.user) {
    const adminUser = await User.findOne({
      email: req.user.email,
      role: 'admin',
    });
    if (adminUser) {
      next();
      return;
    }
  }
  res.status(403).json({ err: 'Admin resource access denied' });
};

module.exports = {
  authCheck,
  adminCheck,
};
