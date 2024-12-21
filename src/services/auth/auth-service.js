import { userStorage } from './storage/users.js';
import { generateToken } from './utils/token.js';

export class AuthService {
  async register(email, password) {
    const existingUser = await userStorage.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await userStorage.createUser(email, password);
    return { userId: user.userId };
  }

  async login(email, password) {
    const user = await userStorage.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.userId, user.email);
    return { token };
  }

  async verifyToken(token) {
    // Keep existing implementation
    return { userId: token.userId, email: token.email };
  }
}