import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    // Project Details
    siteType: { type: String, required: true },
    area: { type: String, required: true },
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
    budget: { type: Number, required: true },
    finishLevel: { type: String, default: 'standard' },
    deadline: { type: Date },
    
    // Contact Details
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    
    comments: { type: String },
    status: { type: String, default: 'pending' }, // To track in Admin Dashboard
  },
  { timestamps: true }
);

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;