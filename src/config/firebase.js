// Development mode authentication - no Firebase required
const auth = {
  async createUser({ email }) {
    return { uid: `user_${Date.now()}`, email };
  },
  
  async getUserByEmail(email) {
    // In development, assume user exists
    return { uid: `user_${Date.now()}`, email };
  },
  
  async getUser(uid) {
    return { uid, email: 'user@example.com' };
  }
};

export { auth };