import jwt from 'jsonwebtoken';
import config from '../config/config.js'
import crypto from 'crypto'

export const refreshTokenFunction = (user) => {
    const userId = user?._id || user?.id;
    return jwt.sign({id: userId},
        config.REFRESH_JWT_SECRET, {
            expiresIn : "7d"
        }
    )
}

export const accessTokenFunction = (user,session) => {
    const userId = user?._id || user?.id;
    return jwt.sign({
        id: userId,
        sessionId :session._id
    },
        config.ACCESS_JWT_SECRET, {
            expiresIn : "15m"
        }
    )
}

export let hash = (val) => { return  crypto.createHash('sha256').update(val).digest('hex') }