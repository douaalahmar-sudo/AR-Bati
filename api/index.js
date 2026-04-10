import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";

dotenv.config();

// Fix: Added the arrow function to the .catch block
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
});

const app = express(); 

app.use(express.json()); //allow the json of the input of the server/ middleware pour parser le json des req

app.use('/api/user', userRouter);
app.use('/api/auth', authrouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// Change "console.use" to "app.use"
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        statusCode, // This must match the variable name above
        message,
    });
});