const Project = require('../models/Project');

// Get all projects with filtering and pagination
exports.getAllProjects = async (req, res) => {
  try {
    const { domain, difficulty, semester, search, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (domain && domain !== 'All') filter.domain = domain;
    if (difficulty) filter.difficulty = difficulty;
    if (semester) filter.semester = parseInt(semester);

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, domain, difficulty, semester, technologies, prerequisites, estimatedHours, resources, learningOutcomes, features, ideaAuthor } = req.body;

    // Validation
    if (!title || !description || !domain || !difficulty || !semester || !estimatedHours) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const project = new Project({
      title,
      description,
      domain,
      difficulty,
      semester,
      technologies: technologies || [],
      prerequisites: prerequisites || [],
      estimatedHours,
      resources: resources || [],
      learningOutcomes: learningOutcomes || [],
      features: features || [],
      ideaAuthor: ideaAuthor || 'Anonymous'
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// Get projects by domain
exports.getProjectsByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const { difficulty, page = 1, limit = 10 } = req.query;

    let filter = { domain };
    if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;

    const projects = await Project.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ rating: -1, createdAt: -1 });

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects by domain',
      error: error.message
    });
  }
};

// Search projects
exports.searchProjects = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Project.countDocuments({ $text: { $search: q } });

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching projects',
      error: error.message
    });
  }
};

// Get project statistics
exports.getStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const byDomain = await Project.aggregate([
      { $group: { _id: '$domain', count: { $sum: 1 } } }
    ]);
    const byDifficulty = await Project.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        byDomain,
        byDifficulty
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
