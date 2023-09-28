const express = require('express')
const route = express.Router()
const AdminController = require('../Controllers/Admin.controller')

route.get('/getPostPending', AdminController.getPostPending)
route.get('/getChartData', AdminController.getPostSevendayAgo)
route.get('/getPostDeleting', AdminController.getPostDelete)
route.put('/markForDelete/:id', AdminController.markForDelete)
route.put('/returnPost/:id', AdminController.returnPost)
route.put('/changeState/:id', AdminController.changeStatePending)
route.delete('/deleteUser/:id', AdminController.deleteUser)
route.delete('/deletePost/:id', AdminController.deletePost)

module.exports = route