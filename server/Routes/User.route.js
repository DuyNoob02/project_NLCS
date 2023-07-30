const express = require('express')
const route = express.Router()
const UserController = require('../Controllers/User.controller');



route.get('/', UserController.fetchAll);

route.post('/register', UserController.register)

route.post('/login', UserController.login)

module.exports = route