const Joi = require('joi')

const movieSchema = Joi.object({
    title: Joi.string().required(),
    releaseYear: Joi.number().integer().required(),
    actors: Joi.array().items(Joi.number().integer()).required(),
    genres: Joi.array().items(Joi.number().integer()).required()
})

module.exports = { movieSchema }