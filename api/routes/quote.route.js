import express from 'express';
// Add deleteQuote to the curly braces here:
import { createQuote, getQuotes, deleteQuote } from '../controllers/quote.controller.js';

const router = express.Router();

router.post('/create', createQuote);
router.get('/get', getQuotes); 
router.delete('/delete/:id', deleteQuote);

export default router;