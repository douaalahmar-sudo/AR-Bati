import express from 'express';
import { createService, getServices } from '../controllers/service.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createService); // Contractor creates
router.get('/get', getServices); // Public sees

export default router;