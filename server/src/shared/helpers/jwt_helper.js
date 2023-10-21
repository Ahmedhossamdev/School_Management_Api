const jwt = require('jsonwebtoken');
const client = require('./../helpers/inti_redis');
const AppError = require("../utlis/appError");
const createError = require("http-errors");


// TODO ERROR HANDLING USING APP ERROR CLASS NOT HTTP ERRORS PACKAGE
module.exports = {

    generateAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.JWT_ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                // Convert userId to a string if it exists ||  use an empty string
                audience: userId ? userId.toString() : '',
            };

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });

        });
    },

    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        if (!authHeader) return next(new AppError('Invalid authorization header' , 401));
        const bearerToken = authHeader.split(' ')

        const token = bearerToken[1]
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(new AppError(401, 'Unauthorized'));
            }
            req.payload = payload
            next();
        });
    },

    generateRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.JWT_REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '30d',
                audience: userId ? userId.toString() : '',
            };

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(new AppError("Server Error",505));
                }
                //resolve(token)
                client.SET(userId.toString() ,token, 'EX', 30 * 24 * 60 * 60 ,(err, reply) => {
                    if (err) {
                        console.log(err.message);
                        reject(new AppError("Server Error",505));
                        return
                    }
                    resolve(token)

                });
            });

        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    return reject(createError.Unauthorized());
                }
                const userId = payload.aud;

                client.GET(userId, (err, result) => {
                    if (err) {
                        reject(InternalServerError());
                    }
                    if (refreshToken === result) {
                        resolve(userId);
                    } else {
                        reject(createError(401, 'Unauthorized'));
                    }
                });
            });
        });
    },

};