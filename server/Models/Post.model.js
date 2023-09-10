const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const { Connection } = require('../Helpers/connections_mongodb')

const realEstateSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    formality: {
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    acreage: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    livingRooms: {
        type: Number
    },
    amenities: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }],
    pending: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = Connection.model('Post', realEstateSchema);