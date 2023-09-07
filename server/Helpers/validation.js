const Joi = require('joi')

const userValidate = data => {
    const userSchema = Joi.object({
        fullName: Joi.string().lowercase(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        password: Joi.string().min(4).max(20).required(),
        role: Joi.string(),
        email: Joi.string().email()
    })
    return userSchema.validate(data);
}

const userValidateLogin = data => {
    const userSchema = Joi.object({
        phoneNumber: Joi.string().min(10).max(10).required(),
        password: Joi.string().min(4).max(20).required(),
        role: Joi.string(),
    })
    return userSchema.validate(data);
}
module.exports = { userValidate, userValidateLogin };