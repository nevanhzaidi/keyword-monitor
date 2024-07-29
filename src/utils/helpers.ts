import { Response } from 'express';

// Checks if a given content string matches any keyword in the keywordsSet.

export const matchesKeyword = (content: string, keywordsSet: { [key: string]: boolean }) => {
  // Iterate over each keyword in the keywordsSet and check if it matches the content.
  return Object.keys(keywordsSet).some(keyword => new RegExp(keyword, 'i').test(content));
};

// Sends a JSON response with the given status code and data.

export const sendResponse = (res: Response, statusCode: number, data: object) => {
  return res.status(statusCode).json(data);
};

