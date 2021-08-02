const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('main/main', {
    title: 'Главная',
    isAuthorized: req.isAuthorized
  });
});

module.exports = router;
