const createError = require('http-errors')
const Post = require('../Models/Post.model')
const UserSchema = require('../Models/User.model')
const client = require('../Helpers/connection_redis')



module.exports = {
    getPostPending: async (req, res, next) => {
        try {
            const response = await Post.find({ pending: true }).populate('userID', 'fullName');
            // console.log(response);
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
            })
            return res.status(200).json({
                message: "Delete successfully!",
                status: 200
            })
        } catch (error) {
            next(error)
        }
    },
    markForDelete: async (req, res, next) => {
        const { id } = req.params;
        console.log(id + "xoa");
        try {
            const result = await Post.findByIdAndUpdate(id, { $set: { forDelete: true } }, { new: true })
            console.log(result);
            if (!result) {
                res.status(404).json({ message: "Not Found!" })
            }
            return res.status(200).json({
                message: 'Post is deleted!',
                status: 200
            })
        } catch (error) {
            createError.InternalServerError();
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

    },

    // getPostSevendayAgo: async (req, res, next) => {
    //     const sevenDaysAgo = new Date();
    //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 20)
    //     try {
    //         const result = await Post.aggregate([
    //             {
    //                 $match: {
    //                     createAt: { $gte: sevenDaysAgo }
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: { $dateToString: { format: "%d-%m-%Y", date: "$createAt" } },
    //                     count: { $sum: 1 }
    //                 }
    //             },
    //             {
    //                 $sort: {
    //                     _id: 1
    //                 }
    //             }
    //         ]);
    //         console.log(result);
    //         const chartData = result.map(item => ({
    //             [item._id]: item.count
    //         }));
    //         res.json(chartData)
    //     } catch (error) {
    //         console.error(err);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
    getPostDelete: async (req, res, next) => {
        try {
            const response = await Post.find({ forDelete: true }).populate('userID', 'fullName');
            // console.log(response);
            if (!response || response.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy bài viết nào đang chờ duyệt." });
            }

            return res.json(response);
        } catch (error) {
            next(error);
        }
    },

    getPostSevendayAgo: async (req, res, next) => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 14);

        const interestedDays = [];

        // Thêm ngày 7 ngày trước vào mảng
        for (let i = 0; i <= 14; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            interestedDays.push(formattedDate);
        }

        // Thêm ngày hiện tại vào cuối mảng
        const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        interestedDays.push(formattedCurrentDate);

        try {
            const result = await Post.aggregate([
                {
                    $match: {
                        createAt: { $gte: sevenDaysAgo }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%d-%m-%Y", date: "$createAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);
            // console.log(result);

            // Tạo một object để lưu trữ dữ liệu đã xử lý
            const processedData = {};

            // Gán giá trị 0 cho các ngày ban đầu
            interestedDays.forEach(day => {
                processedData[day] = 0;
            });

            // Duyệt qua kết quả từ truy vấn cơ sở dữ liệu và cập nhật processedData
            result.forEach(item => {
                const date = item._id;
                const count = item.count;
                processedData[date] = count;
            });

            res.json(processedData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    returnPost: async(req, res, next) => {
        const { id } = req.params;
        console.log(id + "return");
        try {
            const result = await Post.findByIdAndUpdate(id, { $set: { forDelete: false } }, { new: true })
            console.log(result);
            if (!result) {
                res.status(404).json({ message: "Not Found!" })
            }
            return res.status(200).json({
                message: 'Post is returned!',
                status: 200
            })
        } catch (error) {
            createError.InternalServerError();
        }

    }


}
