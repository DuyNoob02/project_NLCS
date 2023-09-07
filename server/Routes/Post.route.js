const express = require('express')
const route = express.Router()
const Post = require('../Controllers/Post.controller')
const multer = require('multer')
const path = require('path');
const {verifyAccessToken} = require('../Helpers/jwt_service');
const uploadCloud = require('../Helpers/Post_cloudinary')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         const timestamp = Date.now();
//         const extension = path.extname(file.originalname);
//         const fileName = `${timestamp}${extension}`;
//         cb(null, fileName);
//     }
// })
//  const  upload = multer({
//     storage: storage
// }).single('images')

route.get('/', Post.getAllPost)
route.get('/:id', Post.getPostByID)
route.get('/getPost/:id', Post.getPostbyIdUser)
route.post('/post', verifyAccessToken, uploadCloud.array('images'), Post.createPost)
// route.post('/post', upload, Post.createPost)
route.put('/:id', uploadCloud.array('images'), Post.updatePost)
route.delete('/:id', Post.deletePost)

module.exports = route;
// module.exports = upload;



