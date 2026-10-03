const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByDomain,
  searchProjects,
  getStats
} = require('../controllers/projectController');

// Main routes
router.get('/', getAllProjects);
router.get('/search', searchProjects);
router.get('/stats', getStats);
router.get('/domain/:domain', getProjectsByDomain);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
