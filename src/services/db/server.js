import express from 'express';
import cors from 'cors';
import { DatabaseService } from './db-service.js';
import { dbRoutes } from './routes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize services
const dbService = new DatabaseService();

// Routes
app.use('/users', dbRoutes(dbService));

app.listen(PORT, () => {
  console.log(`Database service running on port ${PORT}`);
});