import express from 'express';
import { validateAuthRequest } from './validators.js';

export const authRoutes = (authService) => {
  const router = express.Router();

  router.post('/register', validateAuthRequest, async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/login', validateAuthRequest, async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  return router;
};