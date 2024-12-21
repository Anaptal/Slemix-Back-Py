export class MetricsCalculator {
  static calculateGlobalMetrics(cryptos) {
    const marketTotal = this.calculateMarketTotal(cryptos);
    const fundTotal = this.calculateFundTotal(cryptos);
    const guardianUSD = this.calculateGuardianUSD(marketTotal, cryptos[0].startCoef);

    return {
      marketTotal,
      fundTotal,
      guardianUSD
    };
  }

  static calculateMarketTotal(cryptos) {
    return cryptos.reduce((total, crypto) => total + crypto.marketCap, 0);
  }

  static calculateFundTotal(cryptos) {
    return cryptos.reduce((total, crypto) => total + crypto.fundCap, 0);
  }

  static calculateGuardianUSD(marketTotal, startCoef) {
    return marketTotal / startCoef;
  }
}