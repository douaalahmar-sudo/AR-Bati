import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'blocked', 'done'], 
    default: 'todo' 
  },
  attachments: [{ type: String }], // Array of URLs for PDFs/Images
  dueDate: { type: Date },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;