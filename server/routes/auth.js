const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ data: 'hey you hit node API' });
  res.end();
});

module.exports = router;
