import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";
import serviceRouter from "./routes/service.route.js";
import contactRouter from './routes/contact.route.js';
import cookieParser from "cookie-parser";


dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err));

const app = express(); 

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authrouter);
app.use('/api/service', serviceRouter);
app.use('/api/contact', contactRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});