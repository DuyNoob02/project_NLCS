const createError = require('http-errors')
const Post = require('../Models/Post.model')
const UserSchema = require('../Models/User.model')
const client = require('../Helpers/connection_redis')

module.exports = {
    getPostPending: async (req, res, next) => {
        try {
            const response = await Post.find({ pending: true }).populate('userID', 'fullName');
            console.log(response);
            if (!response || response.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy bài viết nào đang chờ duyệt." });
            }

            return res.json(response);
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const userID = req.params.id;
            console.log(userID);
            const user = await UserSchema.findById({
                _id: userID
            })

            if (!user) {
                createError.NotFound()
            }
            console.log(user);
            await Post.deleteMany({
                userID: userID
            })
            await UserSchema.findByIdAndDelete(
                userID
            )

            client.del(userID.toString(), (err, reply) => {
                if (err) {
                    throw createError.InternalServerError();
                }
                res.json({
                    message: 'logout!'
                })
            })
            return res.status(200).json({
                message: "Delete successfully!",
                status: 200
            })
        } catch (error) {
            next(error)
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



            // if (result.images != '') {
            //     try {
            //         fs.unlinkSync('./uploads/' + result.images)
            //     } catch (error) {
            //         next(error)
            //     }
            // }
            return res.status(200).json({
                message: 'Post deleted successfully!',
                status: 200
            })



        } catch (error) {
            next(error)
        }
    },

    changeStatePending: async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        try {
            const result = await Post.findByIdAndUpdate(id, { $set: { pending: false } }, { new: true })
            if (!result) {
                createError.NotFound()
            }
            return res.status(200).json({
                message: 'Post is posted!',
                status: 200
            })
        } catch (error) {
            next(error)
        }

    }
}
