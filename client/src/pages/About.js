import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Academic Projects Platform</h1>
        <p>Empowering B.Tech students with innovative project ideas and resources</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Academic Projects Platform is dedicated to connecting B.Tech students with innovative and practical project ideas. We believe that hands-on projects are the best way to learn and grow as engineers. Our platform provides a curated collection of projects from various domains including AI/ML, Computer Science, and Information Technology.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-number">1</div>
              <div>
                <h3>Curated Project Ideas</h3>
                <p>Carefully selected projects designed for different skill levels and domains</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">2</div>
              <div>
                <h3>Detailed Resources</h3>
                <p>Each project includes tutorials, documentation, and learning materials</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">3</div>
              <div>
                <h3>Community Sharing</h3>
                <p>Students can submit and share their own project ideas with the community</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-number">4</div>
              <div>
                <h3>Career Development</h3>
                <p>Projects designed to enhance your portfolio and career prospects</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="reasons-list">
            <li>
              <strong>Well-Organized:</strong> Projects are categorized by domain, difficulty level, and semester
            </li>
            <li>
              <strong>Practical Focus:</strong> All projects are designed to be implementable within realistic time frames
            </li>
            <li>
              <strong>Community-Driven:</strong> Share your ideas and learn from other students' experiences
            </li>
            <li>
              <strong>Comprehensive Guidance:</strong> Each project includes prerequisites, learning outcomes, and key features
            </li>
            <li>
              <strong>Resource Rich:</strong> Access to tutorials, documentation, and external resources
            </li>
            <li>
              <strong>Always Evolving:</strong> New projects added regularly based on community feedback
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Target Users</h2>
          <div className="users-grid">
            <div className="user-card">
              <div className="user-icon">👨‍🎓</div>
              <h3>B.Tech Students</h3>
              <p>Find project ideas to enhance your skills and portfolio</p>
            </div>
            <div className="user-card">
              <div className="user-icon">👨‍🏫</div>
              <h3>Faculty & Mentors</h3>
              <p>Access a repository of projects to recommend to students</p>
            </div>
            <div className="user-card">
              <div className="user-icon">🤝</div>
              <h3>Industry Professionals</h3>
              <p>Share real-world project ideas and mentor students</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Project Categories</h2>
          <div className="categories-grid">
            <div className="category-box">
              <div className="category-icon">🤖</div>
              <h4>AI/ML</h4>
              <p>Machine Learning, Deep Learning, Natural Language Processing</p>
            </div>
            <div className="category-box">
              <div className="category-icon">💻</div>
              <h4>Computer Science</h4>
              <p>Data Structures, Algorithms, Web Development, Databases</p>
            </div>
            <div className="category-box">
              <div className="category-icon">🔧</div>
              <h4>Information Technology</h4>
              <p>System Design, Cloud Computing, DevOps, IoT</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Getting Started</h2>
          <ol className="steps-list">
            <li>
              <strong>Browse Projects:</strong> Explore our collection of curated project ideas
            </li>
            <li>
              <strong>Filter by Your Interests:</strong> Use domain, difficulty, and semester filters
            </li>
            <li>
              <strong>Review Details:</strong> Check prerequisites, learning outcomes, and resources
            </li>
            <li>
              <strong>Start Your Journey:</strong> Begin implementing the project at your own pace
            </li>
            <li>
              <strong>Share Your Ideas:</strong> Submit your own project ideas for the community
            </li>
          </ol>
        </section>

        <section className="about-section contact-section">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email:</strong>
                <p>info@academicprojects.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <strong>Phone:</strong>
                <p>+91-XXX-XXX-XXXX</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Address:</strong>
                <p>India</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Future Roadmap</h2>
          <ul className="roadmap-list">
            <li>🔄 Real-time collaboration features</li>
            <li>👥 User profiles and portfolios</li>
            <li>🏆 Badges and achievements system</li>
            <li>📱 Mobile application (iOS & Android)</li>
            <li>💬 Community forums and discussions</li>
            <li>🎥 Video tutorials and webinars</li>
            <li>🤖 AI-powered project recommendations</li>
            <li>🌍 Multi-language support</li>
          </ul>
        </section>
      </div>

      <div className="about-footer">
        <p>© 2024 Academic Projects Platform. All rights reserved.</p>
        <p>Committed to empowering the next generation of engineers and developers.</p>
      </div>
    </div>
  );
}

export default About;
