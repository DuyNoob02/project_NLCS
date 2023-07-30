const Joi = require('joi')

const userValidate = data =>{
    const userSchema = Joi.object({
        fullName: Joi.string().lowercase(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        password: Joi.string().min(4).max(20).required()
    })
    return userSchema.validate(data);
}

module.exports = userValidate;