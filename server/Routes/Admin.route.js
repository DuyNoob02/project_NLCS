const express = require('express')
const route = express.Router()
const AdminController = require('../Controllers/Admin.controller')


route.get('/getAllUser', AdminController.fetchAll)
route.get('/getPostPending', AdminController.getPostPending)
route.get('/getChartData', AdminController.getPostSevendayAgo)
route.get('/getAccount', AdminController.getAccountPending)
route.get('/getPostDeleting', AdminController.getPostDelete)
route.get('/countPostPerMonth', AdminController.countPostPerMonth)

route.put('/markForDelete/:id', AdminController.markForDelete)
route.put('/acceptUser/:id', AdminController.acceptUser)
route.put('/returnPost/:id', AdminController.returnPost)
route.put('/changeState/:id', AdminController.changeStatePending)

route.post('/sendConfirmation', AdminController.sendConfirmationAccount)

route.delete('/deleteUser/:id', AdminController.deleteUser)
route.delete('/deletePost/:id', AdminController.deletePost)




module.exports = route