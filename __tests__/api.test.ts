import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import keywordRoutes from '../src/routes/keywordRoutes';
import postRoutes from '../src/routes/postRoutes';
import authRoutes from '../src/routes/authRoutes';
import logRoutes from '../src/routes/logRoutes';
import dotenv from 'dotenv';
import { secrets } from '../src/utils/secrets';

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', keywordRoutes);
app.use('/api', postRoutes);
app.use('/api', logRoutes);

const validCredentials = {
  username: secrets.USERNAME,
  password: secrets.PASSWORD,
};

describe('API Endpoints', () => {
  describe('POST /api/auth', () => {
    it('should authenticate a user with valid credentials and return a JWT', async () => {
      const res = await request(app).post('/api/auth').send(validCredentials);
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app).post('/api/auth').send({
        username: 'admin',
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /api/keywords', () => {
    it('should add a keyword and return success message', async () => {
      const tokenResponse = await request(app).post('/api/auth').send(validCredentials);
      const res = await request(app)
        .post('/api/keywords')
        .set('Authorization', tokenResponse.body.token)
        .send({ keyword: 'example' });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Keyword added');
    });

    it('should return 400 for duplicate keyword', async () => {
      const tokenResponse = await request(app).post('/api/auth').send(validCredentials);
      await request(app)
        .post('/api/keywords')
        .set('Authorization', tokenResponse.body.token)
        .send({ keyword: 'example' });

      const res = await request(app)
        .post('/api/keywords')
        .set('Authorization', tokenResponse.body.token)
        .send({ keyword: 'example' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Duplicate keyword');
    });
  });

  describe('GET /api/keywords', () => {
    it('should return the list of keywords', async () => {
      const tokenResponse = await request(app).post('/api/auth').send(validCredentials);
      const res = await request(app)
        .get('/api/keywords')
        .set('Authorization', tokenResponse.body.token);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});
