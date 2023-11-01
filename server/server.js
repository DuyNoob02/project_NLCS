const express = require('express')

const app = express()
const createError = require('http-errors')
const Post = require('./Routes/Post.route')
const UserRouter = require('./Routes/User.route')
const AdminRouter = require('./Routes/Admin.route')
const Message = require('./Models/Message.model')
const UserSchema = require('./Models/User.model')
const cors = require('cors')
require('./Helpers/connections_mongodb')
require('dotenv').config()
const client = require('./Helpers/connection_redis')
const http = require('http')
// const configSocketIO = require('./Helpers/socket.helper')
const PORT = process.env.PORT || 3001


const { Server: SocketIoServer } = require('socket.io')
const server = http.createServer(app)
const io = new SocketIoServer(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
// const socket = new SocketIoServer(server)



// client.set('foo', 'nguyenkhacduy');
// client.get('foo', (err, result) => {
//     if (err) throw createError.BadRequest()
//     console.log(result);
// })


app.get('/', (req, res, next) => {
    res.send('Home page');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/item', Post);
app.use('/api/user', UserRouter);
app.use('/api/admin', AdminRouter)
app.use('/uploads', express.static("uploads"));
app.options('*', cors())
app.use((req, res, next) => {
    // const err =   new Error('Not Found');
    // err.status = 500;
    // next(err);
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})


io.on("connection", (socket) => {
    console.log(`::::>User connected at ${socket.id}`);
    socket.on('chat-message', async (msg) => {
        const { sender, recipient, content, createdAt } = msg
        console.log("message: " + content);
        try {
            const newMessage = new Message({
                sender,
                recipient,
                content,
                createdAt
            });

            console.log(msg);

            const senderUser = await UserSchema.findById(sender);
            const recipientUser = await UserSchema.findById(recipient);
            if (!senderUser.contacts.includes(recipient)) {
                await UserSchema.findByIdAndUpdate(sender, { $addToSet: { contacts: recipient } });
            }
            if (!recipientUser.contacts.includes(sender)) {
                await UserSchema.findByIdAndUpdate(recipient, { $addToSet: { contacts: sender } });
            }
            socket.broadcast.emit('receive-msg', msg)
            await newMessage.save();
        } catch (error) {
            console.log(error);
        }
    });
    // Thêm phần bắt sự kiện nhận tin nhắn từ server
    socket.on('receive-msg', (msg) => {
        // Gửi tin nhắn đến tất cả các kết nối (bao gồm cả người gửi)
        socket.emit('receive-msg', msg);
    });
    socket.on('get-message-history', async ({ sender, recipient }) => {
        try {
            const history = await Message.find({
                $or: [
                    { sender, recipient },
                    { sender: recipient, recipient: sender }
                ]
            }).sort({ createdAt: 1 });

            socket.emit('receive-message-history', history);
        } catch (error) {
            console.error(error);
        }
    });
    socket.on('disconnected', () => {
        console.log("User disconnected");
    });
})



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

