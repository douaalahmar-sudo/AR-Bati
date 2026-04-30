import nodemailer from 'nodemailer';
import Inquiry from '../models/inquiry.model.js';

export const replyInquiry = async (req, res, next) => {
  const { id } = req.params;
  const { message, email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Ar-Bâti Tunisia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Response to your Ar-Bâti Inquiry",
      text: message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #1a1a1a;">AR-BÂTI <span style="color: #eee27d;">TUNISIE</span></h2>
          <p>Hello,</p>
          <p>${message}</p>
          <br />
          <p>Best regards,<br /><strong>The Ar-Bâti Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // Update status to turn the badge green in your table
    await Inquiry.findByIdAndUpdate(id, { status: 'replied' });

    res.status(200).json({ success: true, message: 'Reply sent!' });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
};

export const respondToInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Inquiry.findByIdAndUpdate(id, { status });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
};

export const createInquiry = async (req, res, next) => {
  try {
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    next(error);
  }
};