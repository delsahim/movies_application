const Joi = require('joi')

const loginSchema = Joi.object(
    {
        username: Joi.string().required(),
        password:Joi.string().required()
    }
)


const signupSchema = Joi.object(
    {
        username: Joi.string().required(),
        password:Joi.string().required(),
        email:Joi.string().email().required()
    }
)

module.exports = {
    signupSchema, loginSchema
}