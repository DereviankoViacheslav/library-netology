const express = require('express');
const passport = require('passport');
const router = express.Router();
const { UserModel } = require('../../../models');
const { isAuthenticatedMiddleware } = require('../../../middlewares');

router.get('/me', isAuthenticatedMiddleware, (req, res) => {
  return res.render('profile/profile', {
    title: 'Мой профиль',
    user: {
      id: '1234',
      userName: 'username',
      email: 'email'
    },
    isAuthorized: req.isAuthorized
  });
});

router.get('/login', (req, res) => {
  return res.render('login/login', {
    title: 'Вход в профиль',
    isAuthorized: req.isAuthorized
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user/me',
    failureRedirect: '/user/login'
  })
);

router.get('/signup', (req, res) => {
  return res.render('signup/signup', {
    title: 'Регистрация',
    isAuthorized: req.isAuthorized
  });
});

router.post('/signup', async (req, res) => {
  const { email, userName, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.render('signup/signup', {
      title: 'Этот email уже используется!',
      isAuthorized: false
    });
  }
  await UserModel.create({
    email,
    userName,
    password
  });
  return res.status(201).redirect('/user/login');
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.status(200).redirect('/');
});

module.exports = router;
