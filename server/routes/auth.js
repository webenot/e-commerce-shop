const express = require('express');

const router = express.Router();

const { currentUser, createOrUpdateUser } = require('controllers/auth');
const { authCheck } = require('middlewares/auth');

router.post('/current-user', authCheck, currentUser);
router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;
