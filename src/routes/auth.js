import express from 'express';
import { proxyRequest } from '../utils/proxy.js';
import { AUTH_SERVICE_URL } from '../config/services.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
  proxyRequest(AUTH_SERVICE_URL, req, res, next);
});

router.post('/login', (req, res, next) => {
  proxyRequest(AUTH_SERVICE_URL, req, res, next);
});

export const authRoutes = router;