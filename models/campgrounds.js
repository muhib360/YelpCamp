const mongoose = require('mongoose')
const reviews = require('./reviews')
const { cloudinary } = require('../cloudinary')

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [{
        url: String,
        filename: String
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

imageSchema.virtual('thumbnail')
    .get(function () {
        return this.url.replace('/upload', '/upload/w_200')
    })

campgroundSchema.post('findOneAndDelete', async (camp) => {
    if (camp) {
        await reviews.deleteMany({
            _id: { $in: camp.reviews }
        })
    }

    if (camp.images) {
        for (const img of camp.images) {
            await cloudinary.uploader.destroy(img.filename);
        }
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)