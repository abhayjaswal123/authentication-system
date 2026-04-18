import express from 'express';
import {authMiddelware} from '../middlewares/auth.middleware.js'
import {login, logout, register, verifyOtp, refreshAccessToken} from '../controllers/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post("/verify-email", verifyOtp);
authRouter.post("/refresh-token", refreshAccessToken);

authRouter.get("/me", authMiddelware, (req,res) =>{
    const {password, ...userData} = req.user.toObject()
    res.status(200).json({ user: userData })
})

export default authRouter;