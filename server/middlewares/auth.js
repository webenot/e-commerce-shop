const admin = require('firebase');

const authCheck = async (req, res, next) => {
  try {
    req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ err: 'Invalid or expired token' });
  }
};

module.exports = { authCheck };
