import userModel from '../models/user.model.js'
import sessionModel from '../models/session.model.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../services/email.service.js'
import { generateOtp, getOtpHtml } from '../utils/otp.generator.js'
import { refreshTokenFunction, accessTokenFunction, hash } from '../utils/generate.token.js'
import otpModel from '../models/otp.model.js'

const refreshCookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const clearCookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: "none"
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });
        const otp = generateOtp();
        const html = getOtpHtml(otp);
        const otpHash = hash(otp);

        await otpModel.create({
            user: user._id,
            otpHash
        })

        await sendEmail(
            user.email,
            "OTP Verification",
            `Your OTP is ${otp}`,
            html
        );

        return res.status(200).json({
            message: "OTP sent to email",
            otpSent: true,
            email: user.email
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const refreshToken = refreshTokenFunction(user);
        const refreshTokenHash = hash(refreshToken);
        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });


        const accessToken = accessTokenFunction(user, session);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)

        return res.status(200).json({
            message: "Login Successfully", accessToken,
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({
                message: "Token not found"
            })
        }
        const refreshTokenHash = hash(token)
        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })
        if (!session) {
            return res.status(400).json({
                message: "session not found"
            })
        }

        session.revoked = true;
        session.save();
        res.clearCookie("refreshToken", clearCookieOptions);

        return res.status(200).json({
            message: "logout successfully"
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Internal Server Error" })
    }
}

export const refreshAccessToken = async (req, res) => {

    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({
                message: "refresh token not found"
            })
        }

        const decoded = jwt.verify(token, config.REFRESH_JWT_SECRET);

        const refreshTokenHash = hash(token)

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })

        if (!session) {
            return res.status(400).json({
                message: "invalid refresh token"
            })
        }

        const newRefreshToken = refreshTokenFunction(decoded);
        const newRefreshTokenHash = hash(newRefreshToken);
        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const accessToken = accessTokenFunction(user, session)

        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions)

        return res.status(200).json({
            message: "refreshed successfully",
            accessToken,
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body || {};

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const record = await otpModel.findOne({ user: user._id });

        if (!record) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const hashedOtp = hash(otp);

        if (hashedOtp !== record.otpHash) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (record.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.isVerified = true;
        await user.save();

        const refreshToken = refreshTokenFunction(user);
        const refreshTokenHash = hash(refreshToken);
        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        const accessToken = accessTokenFunction(user, session);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)

        return res.status(200).json({
            message: "OTP verified successfully",
            accessToken,
            user: {
                username: user.username,
                email: user.email
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}
