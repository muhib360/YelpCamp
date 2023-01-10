const express = require('express');
const Router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const users = require('../controllers/users')
const catchAsync = require('../utils/catchAsync');

Router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.register)

Router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)

Router.get('/logout', users.logout)

module.exports = Router;