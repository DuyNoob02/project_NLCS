const createError = require('http-errors')
const Post = require('../Models/Post.model')
const fs = require('fs')
const verifyAccessToken = require('../Helpers/jwt_service')
// const { findByIdAndUpdate } = require('../Models/User.model')


module.exports = {
    getPost: async (req, res, next) => {
        try {
            const result = await Post.find({
                pending: false,
                forDelete: false
            }).sort({ createAt: -1 }).limit(8);
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
    getAllPost: async (req, res, next) => {
        const page = req.query.page || 1;
        const perPage = 8;
        try {
            const result = await Post.find({
                pending: false,
                forDelete: false
            })
                .sort({ createAt: -1 }) // sắp xếp theo thời gian tạo của bài viết
                .skip((page - 1) * perPage) // Bỏ qua bài viết trên các trang trước đó
                .limit(perPage) // giới hạn bài viết trên trang hiện tại
            if (!result) {
                throw createError.NotFound()
            }
            const totalPosts = await Post.countDocuments({ pending: false })
            // console.log(totalPosts);
            const totalPages = Math.ceil(totalPosts / perPage)
            return res.json({
                result,
                totalPages
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
            const result = await Post.find({ userID: id, pending: false });
            if (!result) {
                throw createError.NotFound('Khong co bai dang')
            }
            res.send(result);
        } catch (error) {
            next(error)
        }
    },

    updatePost: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(req.params);
            const { code, name, formality, address, acreage, bedrooms, bathrooms,
                livingRooms, amenities, price, type, description } = req.body;
            const numericValue = price.replace(/[^0-9]/g, '');
            const existingPost = await Post.findById({_id: id});

            if (!existingPost) {
                throw createError.NotFound('Post not found.')
            }
            const oldImages = existingPost.images
            const newImages = req.files ? req.files.map(file => file.path) : [];
            const imagesToUpdate = newImages.length > 0 ? newImages : oldImages;

            const updatedPost = await Post.findByIdAndUpdate({ _id: id }, {
                code: code, name: name, formality: formality, address: address, acreage: acreage, bedrooms: bedrooms, bathrooms,
                price: numericValue, type: type, livingRooms, amenities, description: description, images: imagesToUpdate
            }, { new: true })
            if (!updatedPost) {
                throw createError.NotFound(`Post with ID ${id} not found`);
            }
            res.json({
                status: 'success',
                message: "Post update successfully!",
            });

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

    search: async (req, res, next) => {
        try {
            const { name } = req.query;
            // console.log(req.query);
            const properties = await Post.find({
                pending: false,
                $text: { $search: name },
            })
            res.json(properties);
            // console.log(properties);
        } catch (error) {
            createError.NotFound()
        }
    },

    searchPostfor: async (req, res, next) => {
        try {
            const { option } = req.query
            // console.log(option);
            const result = await Post.find({
                pending: false,
                formality: option
            })
            res.json(result)
        } catch (error) {
            res.json({ message: error.message })
        }
    }

}