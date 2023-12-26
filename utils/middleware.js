
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const path = require('path');
const ejsMate = require('ejs-mate');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  console.log(__dirname);
  console.log(path.join(__dirname, '/public'));
  console.log(path.join(__dirname, '/views'));

  app.engine('ejs', ejsMate);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  };

  app.use(session(sessionConfig));
  app.use(flash());

  const User = require('../models/user-schema');

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());



  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  })
};

module.exports = setupMiddleware;
