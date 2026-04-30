import Project from '../models/project.model.js';

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};