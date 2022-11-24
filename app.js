const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const { campgroundSchema } = require('./schemas')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campgrounds');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Something went Wrong :('))
db.once('connected', () => console.log('Successfuly Connected'))

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const validation = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(error.details)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', catchAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground })
}))

app.post('/campgrounds', validation, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.put('/campgrounds/:id', validation, catchAsync(async (req, res) => {
    if (!req.body.campground) throw new ExpressError("Invalid Data", 400)
    const { id } = req.params;
    const campground = await Campground.findById(id);
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground })
}))

app.all('*', (req, res, next) => {
    next(new ExpressError("Page not Found", 404))
})

app.use((err, req, res, next) => {
    const { message, statusCode } = err;
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('listening on port')
})