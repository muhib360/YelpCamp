const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campgrounds');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Review = require('./models/reviews')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be logged in');
        return res.redirect(307, '/login');
    }

    next()

}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You don\'t have permission to do that');
        return res.redirect(`/campgrounds/${campground._id}`)
    }

    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findById(id);
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You don\'t have permission to do that');
        return res.redirect(`/campgrounds/${campground._id}`)
    }

    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// module.exports.areImagesValid = (req, res, next) => {
//     const { id } = req.params
//     const campground = new Campground(req.body.campground);
//     const c = Campground.findById(campground._id)
//     // campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
//     // if ((campground.images.length > 5)) {
//     req.flash('error', 'Cannot Upload more than 5 images');
//     return res.redirect(`/campgrounds/new`);
//     // }
//     next();
// }