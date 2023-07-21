const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const { PostConnection } = require('../Helpers/connections_mongodb')

const realEstateSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    acreage: {type: String, required: true},
    rooms: {
        bedrooms: { type: Number },
        bathrooms: { type: Number },
        livingRooms: { type: Number },
        // Các phòng khác...
    },
    amenities: {type: String},
    price: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }]
})

module.exports = PostConnection.model('Post', realEstateSchema);