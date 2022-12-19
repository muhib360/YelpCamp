const express = require('express');
const Router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const catchAsync = require('../utils/catchAsync');

Router.get('/register', (req, res) => {
    res.render('users/register')
})

Router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.logIn(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

Router.get('/login', (req, res) => {
    res.render('users/login');
})

Router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
    req.flash('success', 'Welcome back');
    let str = req.session.returnTo;
    if (str !== undefined) {
        const haveReview = str.includes('/reviews');
        if (haveReview) {
            const i = str.indexOf('/review');
            str = str.slice(0, i);
        }
        req.session.returnTo = str;
        console.log(req.session.returnTo);
    }
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

Router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (!err) {
            req.flash('success', 'successfuly logged out');
            res.redirect('/campgrounds')
        } else {
            next(err)
        }
    });
})

module.exports = Router;