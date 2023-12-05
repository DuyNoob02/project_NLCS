const express = require('express')
const route = express.Router()
const UserController = require('../Controllers/User.controller');
const { verifyAccessToken } = require('../Helpers/jwt_service')
const userValidate = require('../Helpers/validation');
const path = require('path');
const User_uploadCloud = require('../Helpers/User_cloudinary')
// const TimeController = require('../Controllers/RecordUserTimeInPost.controller')

route.get('/', UserController.fetchAll);

route.post('/register', UserController.register)

route.post('/login', UserController.login)

route.delete('/logout', UserController.logout)
// route.delete('/deleteUser/:id', UserController.deleteUser)
// route.get('/getInfoUser',verifyAccessToken ,UserController.getInfoUser)
route.get('/getInfoUser/:id', UserController.getInfoUser)
route.get('/getContactList/:id', UserController.getContactList)
route.put('/update/:id', UserController.update)
route.put('/updateAvt/:id', User_uploadCloud.single('image'), UserController.updateAVT)

route.post('/refresh-token', UserController.refreshToken)


module.exports = route