export class DatabaseService {
  constructor() {
    this.users = new Map();
  }

  async createUser(id, email, data) {
    if (this.users.has(id)) {
      throw new Error('User already exists');
    }
    
    const user = { id, email, data };
    this.users.set(id, user);
    return user;
  }

  async getUser(id) {
    const user = this.users.get(id);
    return user || null;
  }
}