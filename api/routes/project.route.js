import express from 'express';
import { createProject, getProjects } from '../controllers/project.controller.js';

const router = express.Router();

router.post('/create', createProject);
router.get('/get', getProjects); // ywli ynajm yaaml add projects msh ycreati brk

export default router;