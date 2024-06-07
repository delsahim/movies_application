const Joi = require('joi')

const actorSchema = Joi.object(
    {
        name: Joi.string().required(),
        birthYear:Joi.number().integer().required()
    }
)

module.exports = { actorSchema }
