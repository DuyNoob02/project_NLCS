const express = require('express')

const app = express()
const createError = require('http-errors')
const Post = require('./Routes/Post.route')
const UserRouter = require('./Routes/User.route')
require('./Helpers/connections_mongodb')
require('dotenv').config()
const PORT = process.env.PORT || 3001

app.get('/', (req, res, next) => {
    res.send('Home page');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/item', Post);
app.use('/api/user', UserRouter);
app.use('/uploads', express.static("uploads"));

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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})