import Project from '../models/Project.js';

export const fallbackProjectsList = [
  {
    _id: 'proj_1',
    title: 'WorkoutAdvisor',
    description: 'Personalized Workout Advisory Platform built with React.js, Node.js, Express.js, and MongoDB. Features responsive React frontend, RESTful Express APIs, and client-server integration for customized workout recommendations.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/ankitkumar952390',
    liveUrl: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    category: 'Full Stack',
    featured: true,
    order: 1,
    createdAt: new Date('2026-06-01').toISOString(),
  },
  {
    _id: 'proj_2',
    title: 'Interview Coach',
    description: 'AI-Powered Interview Preparation Platform using React.js, Node.js, Express.js, MongoDB, and AI integration. Provides AI mock interviews, resume analysis, job-description matching, project-defense evaluation, and user session report storage.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI/LLM', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ankitkumar952390',
    liveUrl: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'AI & ML',
    featured: true,
    order: 2,
    createdAt: new Date('2026-07-01').toISOString(),
  },
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    let projects = [];
    try {
      projects = await Project.find().sort({ order: 1, createdAt: -1 });
    } catch (dbErr) {
      console.warn('[Projects DB Warning] Could not fetch projects from DB, serving fallback data');
    }

    if (!projects || projects.length === 0) {
      projects = fallbackProjectsList;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res, next) => {
  try {
    let project = null;
    try {
      project = await Project.findById(req.params.id);
    } catch (dbErr) {
      project = fallbackProjectsList.find((p) => p._id === req.params.id);
    }

    if (!project) {
      project = fallbackProjectsList.find((p) => p._id === req.params.id);
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, imageUrl, category, featured, order } = req.body;

    if (!title || !description || !technologies) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and technologies',
      });
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : technologies.split(',').map((t) => t.trim());

    const project = await Project.create({
      title,
      description,
      technologies: techArray,
      githubUrl: githubUrl || 'https://github.com/ankitkumar952390',
      liveUrl: liveUrl || '#contact',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: category || 'Full Stack',
      featured: featured !== undefined ? featured : true,
      order: order !== undefined ? order : 0,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with id ${req.params.id}`,
      });
    }

    if (req.body.technologies && !Array.isArray(req.body.technologies)) {
      req.body.technologies = req.body.technologies.split(',').map((t) => t.trim());
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with id ${req.params.id}`,
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
