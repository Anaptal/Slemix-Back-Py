import { MetricsCalculator } from './metrics-calculator.js';

export class CryptoService {
  constructor(cryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async getCryptoList() {
    const cryptos = await this.cryptoRepository.findAll();
    const { marketTotal, fundTotal, guardianUSD } = MetricsCalculator.calculateGlobalMetrics(cryptos);
    
    return cryptos.map(crypto => ({
      ...crypto,
      marketTotal,
      fundTotal,
      guardianUSD
    }));
  }

  async calculateMetrics(cryptoId, { mintUSD, burnUSD }) {
    const crypto = await this.cryptoRepository.findById(cryptoId);
    if (!crypto) {
      throw new Error('Cryptocurrency not found');
    }

    const cryptos = await this.cryptoRepository.findAll();
    const { fundTotal } = MetricsCalculator.calculateGlobalMetrics(cryptos);

    return {
      mint: crypto.calculateMintMetrics(mintUSD, fundTotal),
      burn: crypto.calculateBurnMetrics(burnUSD, fundTotal)
    };
  }
}