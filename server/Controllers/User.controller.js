const UserSchema = require('../Models/User.model')
const createError = require('http-errors');
const { userValidate, userValidateLogin } = require('../Helpers/validation');
const client = require('../Helpers/connection_redis')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Helpers/jwt_service')




module.exports = {
    fetchAll: async (req, res, next) => {
        try {
            const result = await UserSchema.find({
                role: 'user'
            });
            // console.log(result);
            if (!result) {
                createError.NotFound();
            }
            res.json({
                result
            })
        } catch (error) {
            next(error)
        }
    },

    register: async (req, res, next) => {
        // console.log(req.body);
        try {
            const { fullName, phoneNumber, password, role, email } = req.body;
            const { error } = userValidate(req.body); //verify information
            if (error) {
                console.log("Loi dau tien", error.details[0].message);
                throw createError(error.details[0].message);
            }
            try {
                const isExists = await UserSchema.findOne({
                    phoneNumber
                });
                if (isExists) {
                    console.log("Dung do");
                    return res.json({
                        status: "conflict",
                        message: "conflict",
                        statusCode: 409
                    })
                }
            } catch (error) {
                return res.json({
                    message: error.code
                })
            }


            //create new user
            const user = new UserSchema({
                fullName,
                phoneNumber,
                password,
                role,
                email
            })

            //save user into DB
            const savedUser = await user.save()

            return res.json({
                status: 'ok',
                elements: savedUser,
                statusCode: 200
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: error,
                message: error.code
            })
            // next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            console.log("Chạy tới đăng nhập");
            const { error } = userValidateLogin(req.body);
            if (error) {
                throw createError(error.details[0].message);
            }

            const { phoneNumber, password } = req.body;
            const user = await UserSchema.findOne({
                phoneNumber
            })
            // console.log(user);
            
            if (!user) {
                throw createError.NotFound(`${phoneNumber} is not registerd`)
            }


            const isValid = await user.isCheckPassword(password)
            if (!isValid) {
                throw createError.Unauthorized('Khong xac thuc')
            }
            const accept = user.accept
            if (accept === false) {
                throw createError.Unauthorized('Un-Actived')
            }

            const fullName = user.fullName
            const image = user.image
            const userID = user._id
            const role = user.role
            
            console.log(accept);

            const accessToken = await signAccessToken(user._id);
            console.log(accessToken);
            const refreshToken = await signRefreshToken(user._id);
            if (role == 'admin') {
                return res.json({
                    message: "admin", data: {
                        role,
                        accessToken,
                        refreshToken,
                        fullName,
                        userID
                    }
                })
            }
            if (accept === true && isValid) {
                return res.json({
                    data: {
                        accessToken,
                        refreshToken,
                        fullName,
                        image,
                        userID,
                        role
                    }

                },)
            }


        } catch (error) {
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            console.log(req.body);
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
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

    update: async (req, res, next) => {
        try {
            const userID = req.params.id
            // console.log(userID);
            const user = await UserSchema.findOne({
                _id: userID
            })
            if (!user) {
                throw createError.NotFound('User not found')
            }

            const updatedEmail = req.body.email;
            let emailExist = null;
            if (updatedEmail !== user.email) {
                const emailExist = await UserSchema.findOne({ email: updatedEmail });

                if (emailExist) {
                    throw createError.Conflict('Email already exists');
                }
            }

            if (user && !emailExist) {
                const updateInfo = {
                    ...user._doc,
                    ...req.body
                }
                // console.log(updateInfo);
                await UserSchema.findByIdAndUpdate({ _id: userID }, updateInfo, { new: true })

                return res.status(200).json({ message: 'oke', updateInfo });
            }

        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw createError.BadRequest();
            }
            const { userID } = await verifyRefreshToken(refreshToken);
            client.del(userID.toString(), (err, reply) => {
                if (err) {
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
    getInfoUser: async (req, res, next) => {
        try {

            // const userID = req.payload.userID;
            const userID = req.params.id;
            // console.log(userID);

            const data = await UserSchema.findById(userID)
            // console.log(data);
            // console.log(req.payload);
            return res.status(200).json({
                ...data._doc
            })
        } catch (error) {
            next(error)
        }
    },
    updateAVT: async (req, res, next) => {
        try {
            const { id } = req.params;
            const file = req.file.path;

            // console.log(file);
            if (!file) {
                createError.BadRequest('No file uploaded')
            }
            const user = await UserSchema.findById({ _id: id });
            if (!user) {
                console.log('User not found');
            }
            const newAVT = {
                ...user._doc,
                image: file
            }

            await UserSchema.findByIdAndUpdate({ _id: id }, newAVT, { new: true })
            res.status(201).json({ message: 'ok', newAVT })

        } catch (error) {
            console.log(error);
        }
    },

    getContactList: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await UserSchema.findOne({ _id: id });

            if (!user) {
                return createError.NotFound("Không tìm thấy người dùng");
            }

            const contactList = user.contacts;

            if (!contactList || contactList.length === 0) {
                return createError.NotFound("Không có danh sách liên hệ");
            }

            const InforContact = [];

            for (const contact of contactList) {
                const result = await UserSchema.findOne({ _id: contact });
                if (result) {
                    InforContact.push(result);
                }
            }

            res.status(200).json({
                InforContact
            });
        } catch (error) {
            next(error);
        }
    }




}