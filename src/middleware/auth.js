import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';
import { auth } from '../config/firebase.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await auth.getUser(decoded.userId);
    
    req.user = {
      userId: user.uid,
      email: user.email
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};