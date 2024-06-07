const Joi = require('joi')

const genreSchema = Joi.object(
    {
        genre: Joi.string().required(),

    }
)


module.exports = {genreSchema}