export class User {
  constructor({ userId, email, displayName, createdAt }) {
    this.userId = userId;
    this.email = email;
    this.displayName = displayName;
    this.createdAt = createdAt || new Date();
  }
}