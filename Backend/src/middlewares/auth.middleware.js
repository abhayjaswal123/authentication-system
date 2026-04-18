import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import sessionModel from '../models/session.model.js';
import userModel from '../models/user.model.js'

export const authMiddelware = async(req, res, next) =>{
    try{
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    let token = authHeader.split(" ")[1];
    let decoded = jwt.verify(token,config.ACCESS_JWT_SECRET);

    const session = await sessionModel.findById(decoded.sessionId);
    if (!session || session.revoked) {
        return res.status(401).json({ message: 'Session is invalid or revoked' })
    }

    const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        req.user = user;
        req.session = session;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err.message)
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}