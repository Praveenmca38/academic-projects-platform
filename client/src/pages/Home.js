import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch recent projects
        const projectsRes = await projectAPI.getAllProjects({ limit: 6 });
        setProjects(projectsRes.data.data);

        // Fetch statistics
        const statsRes = await projectAPI.getStats();
        setStats(statsRes.data.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Academic Projects Platform</h1>
          <p>Discover, Share, and Collaborate on Amazing B.Tech Project Ideas</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary btn-lg">
              Explore Projects
            </Link>
            <Link to="/add-project" className="btn btn-secondary btn-lg">
              Submit Your Idea
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{stats.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            {stats.byDomain.map((item, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{item.count}</div>
                <div className="stat-label">{item._id}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <Link to="/projects" className="view-all">
            View All →
          </Link>
        </div>

        {loading && <div className="loading">Loading projects...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="no-projects">
            <p>No projects available yet.</p>
            <Link to="/add-project" className="btn btn-primary">
              Be the first to submit!
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Curated Ideas</h3>
            <p>Find carefully selected project ideas tailored for B.Tech students</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learning Resources</h3>
            <p>Each project includes tutorials, documentation, and learning materials</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>Share your ideas and collaborate with fellow students</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Easy to Start</h3>
            <p>Clear prerequisites and step-by-step guidance for each project</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Access projects from any device, anywhere, anytime</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Career Focused</h3>
            <p>Projects designed to enhance your portfolio and career prospects</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Project Journey?</h2>
        <p>Explore our collection of exciting projects or share your own idea with the community</p>
        <div className="cta-buttons">
          <Link to="/projects" className="btn btn-primary btn-lg">
            Browse All Projects
          </Link>
          <Link to="/add-project" className="btn btn-secondary btn-lg">
            Submit a Project Idea
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
