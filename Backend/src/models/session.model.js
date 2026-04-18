import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required"]
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1 * 24 * 60 * 60
    }
});

const sessionModel = mongoose.model('session', sessionSchema);
export default sessionModel;