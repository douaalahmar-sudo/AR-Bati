import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  // el usernames unique
    },
    email: {
        type: String,
        required: true,
        unique: true,  // el emails lzm unique
    },
    password: {
        type: String,
        required: true, 
    },
}, { timestamps: true }); // yaml createdAt w updatedAt automatiquement

const User = mongoose.model("User", userSchema);

export default User;