const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { Connection } = require('../Helpers/connections_mongodb')

const BusinessSchema = new Schema({
    link: {
        type: String
    },
    title: {
        type:String
    },
    image: {
        type: String
    }
});

module.exports = Connection.model('Business', BusinessSchema)