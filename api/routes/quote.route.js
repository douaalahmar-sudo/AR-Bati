import express from 'express';
import { createQuote, getQuotes, deleteQuote } from '../controllers/quote.controller.js';

const router = express.Router();

router.post('/create', createQuote);
router.get('/get', getQuotes); // Ensure this line is present!
router.delete('/delete/:id', deleteQuote);

export default router;