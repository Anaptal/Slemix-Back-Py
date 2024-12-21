import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { validateCalculateRequest } from '../middleware/validators.js';

export const cryptoRoutes = (cryptoService) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const cryptos = await cryptoService.getCryptoList();
      res.json(cryptos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/calculate', authenticateToken, validateCalculateRequest, async (req, res) => {
    try {
      const { cryptoId, mintUSD, burnUSD } = req.body;
      const metrics = await cryptoService.calculateMetrics(cryptoId, { mintUSD, burnUSD });
      res.json(metrics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};