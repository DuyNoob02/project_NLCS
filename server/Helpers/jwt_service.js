const JWT = require('jsonwebtoken')

const signAccessToken = async (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userID
        }
        const secret = process.env.ACCESSTOKEN_SECRET_KEY
        const option = {
            expiresIn: '1h'
        }
        JWT.sign(payload, secret, option, (err, token)=>{
            if(err){
                reject(err);
            }
            resolve(token);
        })
    })
}

module.exports = {signAccessToken}