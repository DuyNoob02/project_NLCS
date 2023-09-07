const express = require('express')

const app = express()
const createError = require('http-errors')
const Post = require('./Routes/Post.route')
const cors = require('cors')
const UserRouter = require('./Routes/User.route')
require('./Helpers/connections_mongodb')
require('dotenv').config()
const client = require('./Helpers/connection_redis')
const PORT = process.env.PORT || 3001

client.set('foo', 'nguyenkhacduy');
client.get('foo', (err, result)=>{
    if(err) throw createError.BadRequest()
    console.log(result);
})


app.get('/', (req, res, next) => {
    res.send('Home page');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/item', Post);
app.use('/api/user', UserRouter);
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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})