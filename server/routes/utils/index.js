import jwt from 'jsonwebtoken'
import config from '../../config'


export function checkAuth (req, res, next) {
  const token =  (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ?
     req.headers.authorization.split(' ')[1] : null;
    const {secret} = config.jwt;
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}

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