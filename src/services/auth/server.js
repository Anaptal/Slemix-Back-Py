import express from 'express';
import cors from 'cors';
import { AuthService } from './auth-service.js';
import { authRoutes } from './routes.js';
import { errorHandler } from '../../middleware/error-handler.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Initialize services
const authService = new AuthService();

// Routes
app.use('/auth', authRoutes(authService));

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});