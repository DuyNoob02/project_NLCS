const socketIo = require('socket.io')
const Message = require('../Models/Message.model')
function configSocketIO(server) {
    const io = socketIo(server)

    io.on('connection', (socket) => {
        console.log("A user connected");

        socket.on('chat message', async (msg) => {
            const { sender, recipient, content } = msg
            console.log("message: " + msg);
            try {
                const newMessage = new Message({
                    sender,
                    recipient,
                    content
                });

                await newMessage.save();

                io.to(recipient).emit('chat message', newMessage)
            } catch (error) {
                console.log(error);
            }
        });
        // Thêm phần bắt sự kiện nhận tin nhắn từ server
        socket.on('receive message', (msg) => {
            // Gửi tin nhắn đến tất cả các kết nối (bao gồm cả người gửi)
            io.emit('receive message', msg);
        });
        socket.on('get message history', async ({ sender, recipient }) => {
            try {
                const history = await Message.find({
                    $or: [
                        { sender, recipient },
                        { sender: recipient, recipient: sender }
                    ]
                }).sort({ createdAt: 1 });

                socket.emit('receive message history', history);
            } catch (error) {
                console.error(error);
            }
        });
        socket.on('disconnected', () => {
            console.log("User disconnected");
        });
    });

    return io;
}

module.exports = configSocketIO;

// const socketIo = require('socket.io')
// const Message = require('../Models/Message.model')
// const io = socketIo(server)

// io.on('connection', (socket) => {
//     console.log("A user connected");

//     socket.on('chat message', async (msg) => {
//         const { sender, recipient, content } = msg
//         console.log("message: " + msg);
//         try {
//             const newMessage = new Message({
//                 sender,
//                 recipient,
//                 content
//             });

//             await newMessage.save();

//             io.to(recipient).emit('chat message', newMessage)
//         } catch (error) {
//             console.log(error);
//         }
//     });
//     // Thêm phần bắt sự kiện nhận tin nhắn từ server
//     socket.on('receive message', (msg) => {
//         // Gửi tin nhắn đến tất cả các kết nối (bao gồm cả người gửi)
//         io.emit('receive message', msg);
//     });
//     socket.on('get message history', async ({ sender, recipient }) => {
//         try {
//             const history = await Message.find({
//                 $or: [
//                     { sender, recipient },
//                     { sender: recipient, recipient: sender }
//                 ]
//             }).sort({ createdAt: 1 });

//             socket.emit('receive message history', history);
//         } catch (error) {
//             console.error(error);
//         }
//     });
//     socket.on('disconnected', () => {
//         console.log("User disconnected");
//     });
// });

// module.exports = io;