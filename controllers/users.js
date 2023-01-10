const User = require('../models/users');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    let str = req.session.returnTo;
    if (str !== undefined) {
        const haveReview = str.includes('/reviews');
        if (haveReview) {
            const i = str.indexOf('/review');
            str = str.slice(0, i);
        }
        req.session.returnTo = str;
    }

    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (!err) {
            req.flash('success', 'successfuly logged out');
            res.redirect('/campgrounds')
        } else {
            next(err)
        }
    });
}