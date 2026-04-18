import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    },
})

const userModel =  mongoose.model('user', userSchema);
export default userModel;