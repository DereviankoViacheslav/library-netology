const express = require('express');
const router = express.Router();

router.get('/404', (req, res) => {
  return res.render('error/404', {
    title: 'Страница не найдена',
    isAuthorized: req.isAuthorized
  });
});

module.exports = router;
