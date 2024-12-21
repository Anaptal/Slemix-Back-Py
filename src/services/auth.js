import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';

export class AuthService {
  constructor() {
    this.users = new Map();
  }

  async register(email, password) {
    if (this.users.has(email)) {
      throw new Error('User already exists');
    }

    const user = {
      id: Date.now().toString(),
      email,
      password // In production, hash the password!
    };

    this.users.set(email, user);
    return { userId: user.id };
  }

  async login(email, password) {
    const user = this.users.get(email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token };
  }
}