const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../Helpers/connection_redis')

const signAccessToken = async (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userID
        }
        const secret = process.env.ACCESSTOKEN_SECRET_KEY
        const option = {
            expiresIn: '1m'
        }
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    console.log(token);
    //start verify token
    JWT.verify(token, process.env.ACCESSTOKEN_SECRET_KEY, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload;
        next();
    })
}



const signRefreshToken = async (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userID
        }
        const secret = process.env.REFRESHTOKEN_SECRET_KEY
        const option = {
            expiresIn: '1w'
        }
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                reject(err);
            }
            client.set(userID.toString(), token, "EX", 7 * 24 * 60 * 60, (err, reply) => {
                if (err) {
                    return reject(createError.InternalServerError());
                }
                return resolve(token);
            })
        })
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESHTOKEN_SECRET_KEY, (err, payload) => {
            if (err) {
                return reject(err)
            }
            client.get(payload.userID, (err, reply) => {
                if (err) {
                    return reject(createError.InternalServerError())
                }
                if (refreshToken === reply) {
                    resolve(payload)
                }
                return reject(createError.Unauthorized())
            })

        })
    })
}
module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}