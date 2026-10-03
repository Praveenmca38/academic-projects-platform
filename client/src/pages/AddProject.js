import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../services/api';
import './AddProject.css';

function AddProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: 'AI/ML',
    difficulty: 'Intermediate',
    semester: 5,
    technologies: '',
    prerequisites: '',
    estimatedHours: 10,
    learningOutcomes: '',
    features: '',
    ideaAuthor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title || !formData.description || !formData.estimatedHours) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        prerequisites: formData.prerequisites
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p),
        learningOutcomes: formData.learningOutcomes
          .split(',')
          .map((o) => o.trim())
          .filter((o) => o),
        features: formData.features
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f),
        estimatedHours: parseInt(formData.estimatedHours),
        semester: parseInt(formData.semester),
      };

      await projectAPI.createProject(submitData);
      setSuccess('Project submitted successfully!');
      setTimeout(() => {
        navigate('/projects');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-page">
      <div className="form-header">
        <h1>Submit Your Project Idea</h1>
        <p>Share your innovative project idea with the B.Tech community</p>
      </div>

      <div className="form-container">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit} className="project-form">
          {/* Basic Information */}
          <fieldset className="form-section">
            <legend>Basic Information</legend>

            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your project idea in detail"
                rows="6"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="domain">Domain *</label>
                <select
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level *</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estimatedHours">Estimated Hours *</label>
                <input
                  type="number"
                  id="estimatedHours"
                  name="estimatedHours"
                  value={formData.estimatedHours}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Technical Details */}
          <fieldset className="form-section">
            <legend>Technical Details</legend>

            <div className="form-group">
              <label htmlFor="technologies">Technologies (comma-separated)</label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="e.g., Python, TensorFlow, Keras"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prerequisites">Prerequisites (comma-separated)</label>
              <input
                type="text"
                id="prerequisites"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleInputChange}
                placeholder="e.g., Python Basics, Linear Algebra"
              />
            </div>
          </fieldset>

          {/* Learning & Features */}
          <fieldset className="form-section">
            <legend>Learning Outcomes & Features</legend>

            <div className="form-group">
              <label htmlFor="learningOutcomes">Learning Outcomes (comma-separated)</label>
              <textarea
                id="learningOutcomes"
                name="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={handleInputChange}
                placeholder="e.g., Understand CNNs, Learn data preprocessing, Build neural networks"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="features">Key Features (comma-separated)</label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="e.g., Load MNIST dataset, Build CNN model, Train and validate"
                rows="4"
              />
            </div>
          </fieldset>

          {/* Author Info */}
          <fieldset className="form-section">
            <legend>About You</legend>

            <div className="form-group">
              <label htmlFor="ideaAuthor">Your Name / Pseudonym</label>
              <input
                type="text"
                id="ideaAuthor"
                name="ideaAuthor"
                value={formData.ideaAuthor}
                onChange={handleInputChange}
                placeholder="Leave blank to submit anonymously"
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Project Idea'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="btn btn-secondary btn-lg"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="form-tips">
          <h3>💡 Tips for a Great Project Idea</h3>
          <ul>
            <li>Be clear and descriptive in your project description</li>
            <li>Include realistic time estimates</li>
            <li>List all required technologies and prerequisites</li>
            <li>Specify learning outcomes for students</li>
            <li>Break down key features step-by-step</li>
            <li>Include relevant resources and references</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
