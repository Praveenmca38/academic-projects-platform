import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'badge-success';
      case 'Intermediate':
        return 'badge-warning';
      case 'Advanced':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'AI/ML':
        return '#3498db';
      case 'CSE':
        return '#2ecc71';
      case 'IT':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="project-card card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span
          className="domain-badge"
          style={{ backgroundColor: getDomainColor(project.domain) }}
        >
          {project.domain}
        </span>
      </div>

      <p className="project-description">{project.description.substring(0, 120)}...</p>

      <div className="project-meta">
        <span className={`badge ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>
        <span className="badge badge-primary">
          Semester {project.semester}
        </span>
        <span className="project-views">
          👁️ {project.views} views
        </span>
      </div>

      <div className="project-tech">
        <strong>Technologies:</strong>
        <div className="tech-tags">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag">+{project.technologies.length - 3}</span>
          )}
        </div>
      </div>

      <div className="project-footer">
        <div className="project-hours">
          ⏱️ {project.estimatedHours} hours
        </div>
        <Link to={`/projects/${project._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
