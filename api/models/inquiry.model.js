// backend/models/inquiry.model.js
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  type: { type: String, enum: ['contact', 'quote'], required: true },
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  // Quote-specific fields
  siteType: { type: String },
  propertyType: { type: String },
  area: { type: String },
  location: { type: String },
  budget: { type: String },
  finishLevel: { type: String },
  deadline: { type: String },
  comments: { type: String }, 
  status: { type: String, default: 'pending' }, 
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;