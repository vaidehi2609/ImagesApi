const Joi = require('@hapi/joi')

const FSchema = Joi.object({
    image: Joi.string().required(),
    caption:Joi.string().required()
})

module.exports = {
    FSchema
}