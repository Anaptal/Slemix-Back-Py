import { Wallet } from '../../models/Wallet.js';

export class WalletService {
  constructor(walletRepository) {
    this.walletRepository = walletRepository;
  }

  async addWallet(userId, { blockchain, address }) {
    const wallet = new Wallet({
      walletId: `wallet_${Date.now()}`,
      userId,
      blockchain,
      address,
      balance: 0,
      lastUpdated: new Date()
    });

    return this.walletRepository.save(wallet);
  }

  async getWallets(userId) {
    return this.walletRepository.findByUserId(userId);
  }

  async deleteWallet(userId, walletId) {
    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet || wallet.userId !== userId) {
      throw new Error('Wallet not found or access denied');
    }
    
    await this.walletRepository.delete(walletId);
  }
}