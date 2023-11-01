const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Connection } = require('../Helpers/connections_mongodb')
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    recipient: { type: Schema.Types.ObjectId, ref: 'user' },
    content: String,
    createdAt: { type: Date }
});



module.exports = Connection.model('Message', messageSchema);
