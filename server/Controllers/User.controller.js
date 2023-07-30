const UserSchema = require('../Models/User.model')
const createError = require('http-errors');
const userValidate = require('../Helpers/validation');
const {signAccessToken} = require('../Helpers/jwt_service')

module.exports = {
    fetchAll: async (req, res, next) => {
        try {
            const result = UserSchema.find();
            if (!result) {
                createError.NotFound();
            }
            res.json({
                element: result
            })
        } catch (error) {
            next(error)
        }
    },

    register: async (req, res, next) => {
        console.log(req.body);
        try {
            const { fullName, phoneNumber, password } = req.body;
            const { error } = userValidate(req.body); //verify information
            if (error) {
                throw createError(error.details[0].message);
            }
            //account exists check
            const isExists = await UserSchema.findOne({
                phoneNumber
            });
            if (isExists) {
                createError.Conflict(`${phoneNumber} is ready been registered`)
            }
    
            //create new user
            const user = new UserSchema({
                fullName,
                phoneNumber,
                password
            })
    
            //save user into DB
            const savedUser = await user.save()
    
            return res.json({
                status: 'ok',
                elements: savedUser
            })
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { error } = userValidate(req.body);
            if (error) {
                throw createError(error.details[0].message);
            }
            const { phoneNumber, password } = req.body;
    
            const user = await UserSchema.findOne({
                phoneNumber
            })
            if (!user) {
                throw createError.NotFound(`${phoneNumber} is not registerd`)
            }
    
            const isValid = await user.isCheckPassword(password)
            if (!isValid) {
                throw createError.Unauthorized()
            }

            const accessToken = await signAccessToken(user._id);
            res.json({
                accessToken
            })
    
        } catch (error) {
            next(error)
        }
    }
}