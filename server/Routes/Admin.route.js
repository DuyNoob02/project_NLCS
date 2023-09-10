const express = require('express')
const route = express.Router()
const AdminController = require('../Controllers/Admin.controller')

route.get('/getPostPending', AdminController.getPostPending)
route.put('/changeState/:id', AdminController.changeStatePending)
route.delete('/deleteUser/:id', AdminController.deleteUser)
route.delete('/deletePost/:id', AdminController.deletePost)

module.exports = route