import Service from '../models/service.model.js';
import { errorHandler } from '../utils/error.js';

export const createService = async (req, res, next) => {
  try {
    // Only contractors or admins should reach this if your middleware is correct
    const service = await Service.create({
      ...req.body,
      contractor: req.user.id, // Links the service to the logged-in contractor
    });
    return res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};