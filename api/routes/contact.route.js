import express from 'express';
import Contact from '../models/contact.model.js';

const router = express.Router();

router.post('/send', async (req, res, next) => {
  const { name, email, message, service } = req.body;
  const newContact = new Contact({ name, email, message, service });
  try {
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (error) {
    next(error); // Sends error to your error-handling middleware
  }
});

export default router;