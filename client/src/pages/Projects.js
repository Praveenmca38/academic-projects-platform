import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [domain, setDomain] = useState('All');
  const [difficulty, setDifficulty] = useState('');
  const [semester, setSemester] = useState('');
  const [search, setSearch] = useState('');

  const limit = 9;

  useEffect(() => {
    const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page,
        limit,
        ...(domain !== 'All' && { domain }),
        ...(difficulty && { difficulty }),
        ...(semester && { semester }),
      };

      const response = search
        ? await projectAPI.searchProjects(search, params)
        : await projectAPI.getAllProjects(params);

      setProjects(response.data.data);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to load projects. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, [page, domain, difficulty, semester, search, limit]);

const handleSearch = (e) => {
  e.preventDefault();
  setPage(1);
};

const handleFilterChange = () => {
  setPage(1);
};

return (
  <div className="projects-page">
    <div className="projects-header">
      <h1>Explore Projects</h1>
      <p>Find the perfect project idea for your B.Tech journey</p>
    </div>

    <div className="projects-container">
      {/* Sidebar Filters */}
      <aside className="filters-sidebar">
        <div className="filter-section">
          <h3>Search</h3>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        <div className="filter-section">
          <h3>Domain</h3>
          <select
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              handleFilterChange();
            }}
            className="filter-select"
          >
            <option value="All">All Domains</option>
            <option value="AI/ML">AI/ML</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Difficulty</h3>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              handleFilterChange();
            }}
            className="filter-select"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Semester</h3>
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              handleFilterChange();
            }}
            className="filter-select"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearch('');
            setDomain('All');
            setDifficulty('');
            setSemester('');
            setPage(1);
          }}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          Clear Filters
        </button>
      </aside>

      {/* Projects Grid */}
      <main className="projects-main">
        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length > 0 ? (
          <>
            <div className="results-info">
              Showing projects {(page - 1) * limit + 1} -{' '}
              {Math.min(page * limit, (page - 1) * limit + projects.length)}
            </div>

            <div className="grid grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`page-btn ${p === page ? 'active' : ''}`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-projects">
            <p>No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearch('');
                setDomain('All');
                setDifficulty('');
                setSemester('');
                setPage(1);
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  </div>
);
}

export default Projects;
