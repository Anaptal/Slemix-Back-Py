import express from 'express';
import { authenticateToken } from '../../middleware/auth.js';

export const dbRoutes = (dbService) => {
  const router = express.Router();

  router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await dbService.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};