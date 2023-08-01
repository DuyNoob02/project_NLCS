const UserSchema = require('../Models/User.model')
const createError = require('http-errors');
const userValidate = require('../Helpers/validation');
const client = require('../Helpers/connection_redis')
const { signAccessToken, signRefreshToken, verifyRefreshToken} = require('../Helpers/jwt_service')

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
            const refreshToken = await signRefreshToken(user._id);
            res.json({
                accessToken,
                refreshToken
            })

        } catch (error) {
            next(error)
        }
    },

    refreshToken: async(req, res, next)=>{
        try {
            console.log(req.body);
            const {refreshToken} = req.body;
            if(!refreshToken) throw createError.BadRequest();
            const userID = await verifyRefreshToken(refreshToken);
            const newAccessToken = await signAccessToken(userID);
            const newRefreshToken = await signRefreshToken(userID);

            res.json({
                newAccessToken,
                newRefreshToken
            })
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {refreshToken} = req.body;
            if(!refreshToken){
                throw createError.BadRequest();
            }
            const {userID} = await verifyRefreshToken(refreshToken);
            client.del(userID.toString(), (err, reply)=>{
                if(err){
                    throw createError.InternalServerError();
                }
                res.json({
                    message: 'logout!'
                })
            })
        } catch (error) {
            next(error)
        }
    },
    getListUser: (req, res, next) => {
        console.log(req.headers);
        const listUser = [
            {
                "email": "adb"
            }
        ]
        res.json({
            listUser
        })
    }
}