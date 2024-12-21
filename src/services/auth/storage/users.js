// In-memory user storage for development
class UserStorage {
  constructor() {
    this.users = new Map();
  }

  async createUser(email, password) {
    const userId = `user_${Date.now()}`;
    const user = { userId, email, password };
    this.users.set(email, user);
    return user;
  }

  async findByEmail(email) {
    return this.users.get(email);
  }
}

export const userStorage = new UserStorage();