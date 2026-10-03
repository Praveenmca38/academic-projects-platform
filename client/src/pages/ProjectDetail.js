import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectAPI } from '../services/api';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await projectAPI.getProjectById(id);
        setProject(response.data.data);
      } catch (err) {
        setError('Failed to load project details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="loading">Loading project...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="error">Project not found</div>;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return '#27ae60';
      case 'Intermediate':
        return '#f39c12';
      case 'Advanced':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  };

  return (
    <div className="project-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="project-header-detail">
        <div className="header-content">
          <h1>{project.title}</h1>
          <div className="header-badges">
            <span className="badge" style={{ backgroundColor: getDifficultyColor(project.difficulty) }}>
              {project.difficulty}
            </span>
            <span className="badge badge-info">Semester {project.semester}</span>
            <span className="badge badge-info">{project.domain}</span>
            <span className="badge badge-stats">👁️ {project.views} views</span>
          </div>
        </div>
      </div>

      <div className="detail-container">
        <main className="detail-main">
          {/* Description */}
          <section className="detail-section">
            <h2>Project Description</h2>
            <p className="description-text">{project.description}</p>
          </section>

          {/* Learning Outcomes */}
          {project.learningOutcomes && project.learningOutcomes.length > 0 && (
            <section className="detail-section">
              <h2>Learning Outcomes</h2>
              <ul className="list-items">
                {project.learningOutcomes.map((outcome, idx) => (
                  <li key={idx}>
                    <span className="checkmark">✓</span> {outcome}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section className="detail-section">
              <h2>Key Features</h2>
              <ul className="list-items">
                {project.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="checkmark">⭐</span> {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technologies */}
          <section className="detail-section">
            <h2>Technologies & Tools</h2>
            <div className="tech-list">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section className="detail-section">
            <h2>Prerequisites</h2>
            <div className="prerequisites">
              {project.prerequisites.length > 0 ? (
                <ul className="list-items">
                  {project.prerequisites.map((prereq, idx) => (
                    <li key={idx}>
                      <span className="checkmark">📖</span> {prereq}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-item">No specific prerequisites</p>
              )}
            </div>
          </section>

          {/* Resources */}
          {project.resources && project.resources.length > 0 && (
            <section className="detail-section">
              <h2>Learning Resources</h2>
              <div className="resources-list">
                {project.resources.map((resource, idx) => (
                  <div key={idx} className="resource-item">
                    <div className="resource-badge">{resource.type}</div>
                    <div className="resource-content">
                      <h4>{resource.title}</h4>
                      {resource.url && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                          Visit Resource →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="info-card">
            <h3>Project Information</h3>

            <div className="info-item">
              <span className="label">Estimated Duration</span>
              <span className="value">⏱️ {project.estimatedHours} hours</span>
            </div>

            <div className="info-item">
              <span className="label">Difficulty Level</span>
              <span className="value" style={{ color: getDifficultyColor(project.difficulty) }}>
                {project.difficulty}
              </span>
            </div>

            <div className="info-item">
              <span className="label">Semester</span>
              <span className="value">Semester {project.semester}</span>
            </div>

            <div className="info-item">
              <span className="label">Domain</span>
              <span className="value">{project.domain}</span>
            </div>

            <div className="info-item">
              <span className="label">Views</span>
              <span className="value">👁️ {project.views}</span>
            </div>

            <div className="info-item">
              <span className="label">Author</span>
              <span className="value">{project.ideaAuthor}</span>
            </div>
          </div>

          <div className="action-card">
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
              Start Project
            </button>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              Save for Later
            </button>
          </div>

          <div className="related-card">
            <h3>Related Domains</h3>
            <Link to={`/projects?domain=${project.domain}`} className="related-link">
              More {project.domain} projects →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProjectDetail;
