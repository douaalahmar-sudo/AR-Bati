import Project from '../models/project.model.js';

export const createProject = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    
    const newProject = new Project({
      title,
      description,
      image,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};