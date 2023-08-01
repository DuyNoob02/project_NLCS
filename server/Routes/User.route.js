const express = require('express')
const route = express.Router()
const UserController = require('../Controllers/User.controller');
const {verifyAccessToken} = require('../Helpers/jwt_service')


route.get('/', UserController.fetchAll);

route.post('/register', UserController.register)

route.post('/login', UserController.login)

route.delete('/logout', UserController.logout)

route.get('/getlist',verifyAccessToken ,UserController.getListUser)

route.post('/refresh-token', UserController.refreshToken)
module.exports = route