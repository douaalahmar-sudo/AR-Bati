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
    avatar: {
        type: String,
        default:"https://imgs.search.brave.com/lL90r4r89CxNdhFFAGQqRT3PYO6GF-xdyIAu2M4g4-Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aXByY2VudGVyLmdv/di9pbWFnZS1yZXBv/c2l0b3J5L2JsYW5r/LXByb2ZpbGUtcGlj/dHVyZS5wbmcvQEBp/bWFnZXMvaW1hZ2Uu/cG5n"
    },
}, { timestamps: true }); // yaml createdAt w updatedAt automatiquement

const User = mongoose.model("User", userSchema);

export default User;