import { Request, Response } from 'express';
import { sendResponse } from '../utils/helpers';
import { keywordsSet } from '../data/store';


// Adds a new keyword to the keywordsSet.
export const addKeyword = (req: Request, res: Response) => {
  const { keyword } = req.body;

  if (typeof keyword !== 'string' || keyword.trim() === '') {
    return sendResponse(res, 400, { message: "Invalid keyword" });
  }

  if (!(keyword in keywordsSet)) {
    // If the keyword is not already in the set, add it and return a 201 success.
    keywordsSet[keyword] = true;
    return sendResponse(res, 201, { message: "Keyword added" });
  } else {
    return sendResponse(res, 400, { message: "Duplicate keyword" });
  }
};

// Returns a JSON response containing all the keywords in the keywordsSet.
export const listKeywords = (req: Request, res: Response) => {
  return res.json(Object.keys(keywordsSet));
};

export { keywordsSet };
