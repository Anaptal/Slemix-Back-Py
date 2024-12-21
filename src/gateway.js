import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/users.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});