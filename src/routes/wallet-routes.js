import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

export const walletRoutes = (walletService) => {
  const router = express.Router();

  router.use(authenticateToken);

  router.post('/:userId/addWallet', async (req, res) => {
    try {
      const { userId } = req.params;
      const wallet = await walletService.addWallet(userId, req.body);
      res.status(201).json(wallet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/:userId/walletsList', async (req, res) => {
    try {
      const { userId } = req.params;
      const wallets = await walletService.getWallets(userId);
      res.json(wallets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete('/:userId/:walletId', async (req, res) => {
    try {
      const { userId, walletId } = req.params;
      await walletService.deleteWallet(userId, walletId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};