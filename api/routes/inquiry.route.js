import express from 'express';
import { 
  createInquiry, 
  getAllInquiries, 
  respondToInquiry,
  replyInquiry 
} from '../controllers/inquiry.controller.js';

const router = express.Router();

router.post('/create', createInquiry);
router.get('/all', getAllInquiries);
router.post('/respond', respondToInquiry);
router.post('/reply/:id', replyInquiry); 

export default router;