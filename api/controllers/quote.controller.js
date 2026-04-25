import Quote from '../models/quote.model.js';

// This is the one you already have
export const createQuote = async (req, res, next) => {
  try {
    const newQuote = await Quote.create(req.body);
    res.status(201).json(newQuote);
  } catch (error) {
    next(error);
  }
};

// ADD THIS NEW FUNCTION BELOW
// Ensure 'export' is present and the model name 'Quote' is correct
export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    next(error); // This sends the 500 error you see in image_e10f51
  }
};

export const deleteQuote = async (req, res, next) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.status(200).json('Quote has been deleted');
  } catch (error) {
    next(error);
  }
};