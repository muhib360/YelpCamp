const joi = require('joi')

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        description: joi.string().required(),
    }).required(),
    // image: joi.array().required().max(5),
    deleteImages: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        body: joi.string().required()
    }).required()
})