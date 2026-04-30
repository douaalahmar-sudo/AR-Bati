import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Construction, Renovation
  location: { type: String, required: true }, // e.g., Sousse
  imageUrls: { type: Array, required: true }, // Array for multiple photos
  userRef: { type: String, required: true },   // Links the project to the admin
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;