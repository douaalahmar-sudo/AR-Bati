import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Architecture, Rénovation
  location: { type: String, required: true },
  basePrice: { type: Number, required: true },
  contractor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, default: "https://via.placeholder.com/300" }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;