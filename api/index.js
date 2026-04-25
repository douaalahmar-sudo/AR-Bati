import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); 
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route Imports
import userRouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";
import serviceRouter from "./routes/service.route.js";
import contactRouter from './routes/contact.route.js';
import projectRouter from './routes/project.route.js';
import quoteRouter from './routes/quote.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('✅✅✅ DATABASE CONNECTED! AR-BÂTI IS LIVE ✅✅✅');
  })
  .catch((err) => {
    console.error('❌ Connection Error:', err.message);
  });

const app = express(); 

// --- CRITICAL MIDDLEWARES ---
app.use(express.json());    // Parses incoming JSON requests
app.use(cookieParser());    // Allows server to read/clear cookies for Sign Out

// --- ROUTE REGISTRATION ---
app.use("/api/user", userRouter);
app.use("/api/auth", authrouter);
app.use("/api/service", serviceRouter);
app.use("/api/contact", contactRouter);
app.use("/api/project", projectRouter);
app.use('/api/quote', quoteRouter);

// --- ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});