const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const {Connection} = require('../Helpers/connections_mongodb')

const validatePhoneNumber = (value) => {
    const phoneNumberRegrex = /^\d{10}$/;

    if(!phoneNumberRegrex.test(value)){
        throw new Error('Invalid phone number. Please enter a 10-digit phone number.');
    }
}


const UserSchema = new Schema({
    fullName: {
        type: String,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: validatePhoneNumber
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'default-img.png'
    }
})




UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isCheckPassword =  async function(password){//khong duoc su dung arrow function do .compare() la mot middleware, nen phai tham chieu den cha cua phan tu can so sanh
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        next(error)
    }
}

module.exports = Connection.model('User', UserSchema);