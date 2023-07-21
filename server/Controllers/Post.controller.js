const createError = require('http-errors')
const Post = require('../Models/Post.model')
const fs = require('fs')

module.exports = {
    getAllPost: async (req, res, next) => {
        try {
            const result = await Post.find();
            if (!result) {
                throw createError.NotFound()
            }
            return res.json({
                element: result
            })
        } catch (error) {
            next(error)
        }
    },

    createPost: async (req, res, next) => {
        try {
            //xu ly loi khong co file duoc chon
            if (!req.file) {
                throw createError.BadRequest('No file uploaded');
            }

            const { data, images } = req.body;
            const jsonData = JSON.parse(data);

            const { code, name, address, acreage, rooms, amenities, price, type, description } = jsonData;
            const { bedrooms, bathrooms, livingRooms } = rooms;

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
                code: code,
                name: name,
                address: address,
                acreage: acreage,
                rooms: {
                    bedrooms: bedrooms,
                    bathrooms: bathrooms,
                    livingRooms: livingRooms
                },
                amenities: amenities,
                price: price,
                type: type,
                description: description,
                images: req.file.filename // Sử dụng req.file.filename để lấy tên file đã upload
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
        const id = req.params.id
        try {
            const result = await Post.findById(id);
            if (!result) {
                throw createError.NotFound();
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

            if (req.file) {
                // Kiểm tra đường dẫn hình ảnh cũ
                const old_img_path = './uploads/' + req.file.filename;
                if (postToUpdate.images) {
                    try {
                        fs.unlinkSync(old_img_path);
                    } catch (error) {
                        console.error('Error deleting old image:', error);
                    }
                }
                // Cập nhật đường dẫn hình ảnh mới
                new_img = req.file.filename;
            }
            else {
                new_img = postToUpdate.images;
            }
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
            res.send({
                message: 'Post deleted successfully!'
            })
        } catch (error) {
            next(error)
        }
    }
}