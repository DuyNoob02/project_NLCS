const express = require('express')
const route = express.Router()
const BusinessUploadCloud = require('../Helpers/BusinessInfoClound')
const BusinessController = require('../Controllers/Business.controller')
route.get('/', async(req, res, next) => {
    res.send('GET router')
})
route.post('/businessStorage', BusinessUploadCloud.single('image'), BusinessController.post)
route.get('/getBusiness', BusinessController.getAllBussiness)

module.exports = route