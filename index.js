// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const { UserModel } = require('./models');
const { configDB } = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.set('view engine', 'ejs');

const verify = (userName, password, done) => {
  UserModel.findOne({ userName }, (err, user) => {
    if (err) return done(err);
    if (!user || user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  });
};

const options = {
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: false
};

passport.use(new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return cb(new Error());
  }
  cb(null, user);
});

app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET || 'qwerty',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3000;
const { host, ...dbConfig } = configDB;
mongoose.connect(host, dbConfig, (error) => {
  if (error) return console.log('Mongo connection error ===>>>', error);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
