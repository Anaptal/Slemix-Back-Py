export class Wallet {
  constructor({ walletId, userId, blockchain, address, balance = 0, lastUpdated }) {
    this.walletId = walletId;
    this.userId = userId;
    this.blockchain = blockchain;
    this.address = address;
    this.balance = balance;
    this.lastUpdated = lastUpdated || new Date();
  }
}