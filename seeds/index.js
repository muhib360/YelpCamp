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
    // for (let i = 0; i <= 300; i++) {
    //     const random1000Cities = Math.floor(Math.random() * cities.length);
    //     const price = Math.floor(Math.random() * 20) + 10;
    //     const city = new Campground({
    //         title: `${ranTitle(descriptors)} ${ranTitle(places)}`,
    //         location: `${cities[random1000Cities].city}, ${cities[random1000Cities].state}`,
    //         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem assumenda quaerat odit amet asperiores ratione tempora fuga enim, incidunt consequuntur, ipsum, accusamus facere sapiente quam dolorem voluptatibus esse saepe alias.',
    //         price,
    //         geometry: {
    //             type: "Point",
    //             coordinates: [
    //                 cities[random1000Cities].longitude,
    //                 cities[random1000Cities].latitude,
    //             ]
    //         },
    //         images: [
    //             {
    //                 url: 'https://source.unsplash.com/collection/483251/544x500',
    //                 filename: 'YelpCamp/l7ka7dsycp6mhlww4e70'
    //             },
    //             {
    //                 url: 'https://source.unsplash.com/collection/483251/544x500',
    //                 filename: 'YelpCamp/bqsohpzdrht3rxnisqmp'
    //             }
    //         ]
    //     });
    //     city.author = "63995206f9ab1d01adc41308";
    //     await city.save();
    // }
}

seedDB();