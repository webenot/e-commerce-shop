const express = require('express');

const router = express.Router();

const {
  authCheck,
  adminCheck,
} = require('middlewares/auth');

const { create, read, update, remove, list } = require('controllers/product');

router.post('/product', authCheck, adminCheck, create);
router.patch('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.get('/products', list);

module.exports = router;
