import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/helpers';
import { secrets } from '../utils/secrets';

// Authenticate a user with the provided credentials.
export const authenticate = (req: Request, res: Response) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Check if the provided credentials match the valid credentials
  if (username === secrets.USERNAME && password === secrets.PASSWORD) {
    // Generate a JSON Web Token (JWT) with the username and sign it with the secret
    const token = jwt.sign({ username }, secrets.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return sendResponse(res, 401, { message: 'Invalid credentials' });
  }
};

