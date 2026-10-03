const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    minlength: [20, 'Description must be at least 20 characters']
  },
  domain: {
    type: String,
    enum: ['AI/ML', 'CSE', 'IT', 'General'],
    required: [true, 'Please specify the domain']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
    default: 'Intermediate'
  },
  semester: {
    type: Number,
    min: 1,
    max: 8,
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  estimatedHours: {
    type: Number,
    required: true,
    min: 1
  },
  resources: [{
    title: String,
    url: String,
    type: { type: String, enum: ['Tutorial', 'Documentation', 'Article', 'Video'] }
  }],
  ideaAuthor: {
    type: String,
    default: 'Anonymous'
  },
  learningOutcomes: [{
    type: String
  }],
  features: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for better search performance
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });
projectSchema.index({ domain: 1, difficulty: 1 });

module.exports = mongoose.model('Project', projectSchema);
