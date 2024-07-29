import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendResponse } from '../utils/helpers';

// Retrieves the contents of the access.log file and sends it as the response.
export const getLogs = (req: Request, res: Response) => {
  const logFilePath = path.join(__dirname, '../access.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return sendResponse(res, 500, { message: 'Failed to read logs.' });
    }
    res.type('text/plain');
    res.send(data);
  });
};
