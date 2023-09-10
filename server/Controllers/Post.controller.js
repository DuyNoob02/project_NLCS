const createError = require('http-errors')
const Post = require('../Models/Post.model')
const fs = require('fs')
const verifyAccessToken = require('../Helpers/jwt_service')


module.exports = {
    getAllPost: async (req, res, next) => {
        try {
            const result = await Post.find();
            if (!result) {
                throw createError.NotFound()
            }
            return res.json({
                result
            })
        } catch (error) {
            next(error)
        }
    },

    createPost: async (req, res, next) => {

        try {

            //xu ly loi khong co file duoc chon
            if (!req.files) {
                throw createError.BadRequest('No file uploaded');
            }

            // console.log(req.files);
            const userID = req.payload.userID
            // console.log(userID);
            // console.log(req.body);
            const { code, formality, name, address, acreage, bedrooms, bathrooms, livingRooms,
                amenities, price, type, description, pending, createAt } = req.body;

            // console.log(price);
            const numericValue = price.replace(/[^0-9]/g, '');
            // console.log(numericValue);
            // const numericValue = parseFloat(price)
            // const formattedPrice = numericValue.toLocaleString('vi-VN', {
            //     style: 'currency',
            //     currency: 'VND',
            // });
            const isExists = await Post.findOne({
                code
            })
            //xu ly loi da tong tai item
            if (isExists) {
                // console.log("da ton tai");
                throw createError.Conflict(`${code} is ready been created`);
            }

            // Xử lý nếu muốn thêm các trường khác trong yêu cầu POST.
            const newPost = new Post({
                userID: userID,
                code: code,
                formality: formality,
                name: name,
                address: address,
                acreage: acreage,

                bedrooms: bedrooms,
                bathrooms: bathrooms,
                livingRooms: livingRooms,

                amenities: amenities,
                price: numericValue,
                type: type,
                description: description,
                images: req.files.map(file => file.path), // Sử dụng req.file.filename để lấy tên file đã upload
                // images: images // Sử dụng req.file.filename để lấy tên file đã upload
                pending: pending,
                createAt: createAt
            });

            const savedPost = await newPost.save();

            return res.json({
                status: 'ok',
                element: savedPost
            });
        } catch (error) {
            next(error);
        }

    },

    getPostByID: async (req, res, next) => {
        const { id } = req.params
        // console.log(id);
        try {
            const result = await Post.findById({ _id: id });
            if (!result) {
                throw createError.NotFound('Khong tim thay');
            }
            res.send(result);
        } catch (error) {
            next(error)
        }
    },

    getPostbyIdUser: async (req, res, next) => {
        const { id } = req.params;
        // console.log(req.params);
        // console.log(id);
        try {
            const result = await Post.find({ userID: id });
            if (!result) {
                throw createError.NotFound('Khong co bai dang')
            }
            res.send(result);
        } catch (error) {
            next(error)
        }
    },

    updatePost: async (req, res, next) => {
        const id = req.params.id;
        let new_img = "";
        try {
            const postToUpdate = await Post.findById(id);
            if (!postToUpdate) {
                throw createError.NotFound('Post not found.')
            }

            // if (req.file) {
            //     // Kiểm tra đường dẫn hình ảnh cũ
            //     const old_img_path = './uploads/' + req.file.filename;
            //     if (postToUpdate.images) {
            //         try {
            //             fs.unlinkSync(old_img_path);
            //         } catch (error) {
            //             console.error('Error deleting old image:', error);
            //         }
            //     }
            //     // Cập nhật đường dẫn hình ảnh mới
            //     new_img = req.file.filename;
            // }
            // else {
            //     new_img = postToUpdate.images;
            // }
            const newPost = req.body;
            // console.log(newPost);
            newPost.images = new_img;
            try {
                const result = await Post.findByIdAndUpdate(id, newPost);
                // console.log(result);
                res.json({
                    status: 'success',
                    message: "Post update successfully!",
                });
            } catch (error) {
                next(error)
            }
        } catch (error) {
            next(error);
        }

    },

    deletePost: async (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        try {
            const result = await Post.findByIdAndDelete(id);
            if (!result) {
                // Bản ghi không tồn tại, throw error hoặc gửi phản hồi lỗi tùy ý
                throw createError.NotFound('Post not found');
            }

            if (result.images != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.images)
                } catch (error) {
                    next(error)
                }
            }
            return res.status(200).json({
                message: 'Post deleted successfully!',
                status: 200
            })
        } catch (error) {
            next(error)
        }
    },

    
}