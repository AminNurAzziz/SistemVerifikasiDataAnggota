const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const UserController = require('../controllers/userController');


router.route('/register')
    .get(UserController.renderRegister)
    .post(catchAsync(UserController.register));

router.route('/login')
    .get(UserController.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), UserController.login);

router.route('/logout')
    .get(UserController.logout);

module.exports = router;

