const path = require('path')
const mongoose = require('mongoose');
const Campground = require('../models/campgrounds')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Something went Wrong :('))
db.once('connected', () => console.log('Successfuly Connected'))

const ranTitle = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <= 50; i++) {
        const random1000Cities = Math.floor(Math.random() * cities.length);
        const city = new Campground({ title: `${ranTitle(descriptors)} ${ranTitle(places)}`, location: `${cities[random1000Cities].city}, ${cities[random1000Cities].state}` });
        await city.save();
    }
}

seedDB();