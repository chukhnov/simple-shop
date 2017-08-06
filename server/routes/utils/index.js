import jwt from 'jsonwebtoken'
import config from '../../config'

export function generateToken(userData) {
    const {secret} = config.jwt;
    const date = new Date;

    return jwt.sign(userData, secret, {
        expiresIn: date.setDate(date.getDate() + 30)
    });
}

export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        const {secret} = config.jwt;
        jwt.verify(token, secret, function(err, user) {
            if (err) reject(err);
            resolve(user)
        })

    });
}