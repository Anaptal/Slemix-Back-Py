import express from 'express';
import { proxyRequest } from '../utils/proxy.js';
import { DB_SERVICE_URL } from '../config/services.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/me', (req, res, next) => {
  proxyRequest(DB_SERVICE_URL, req, res, next);
});

router.get('/:userId', (req, res, next) => {
  proxyRequest(DB_SERVICE_URL, req, res, next);
});

export const userRoutes = router;