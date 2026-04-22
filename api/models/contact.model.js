import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  service: { type: String }, // To track which service they clicked 'Learn More' on
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;