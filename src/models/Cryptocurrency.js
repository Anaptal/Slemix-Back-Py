export class Cryptocurrency {
  constructor({
    nameCoin,
    ticketCoin,
    logoURL,
    priceCoin,
    marketSup,
    fundSup,
    marketTotal,
    startCoef,
    guardianUSD,
    downCoef,
    upCoef
  }) {
    // Basic properties
    this.nameCoin = nameCoin;
    this.ticketCoin = ticketCoin;
    this.logoURL = logoURL;
    this.priceCoin = priceCoin;
    this.marketSup = marketSup;
    this.fundSup = fundSup;

    // Market metrics
    this.marketCap = this.calculateMarketCap();
    this.marketPart = this.calculateMarketPart(marketTotal);
    this.fundCap = this.calculateFundCap();
    this.guardianCoin = this.calculateGuardianCoin(guardianUSD);
    this.goalCap = this.calculateGoalCap();
    this.goalSup = this.calculateGoalSup();
    this.defSup = this.calculateDefSup();

    // Store coefficients
    this.downCoef = downCoef;
    this.upCoef = upCoef;
  }

  // Basic calculations
  calculateMarketCap() {
    return this.priceCoin * this.marketSup;
  }

  calculateMarketPart(marketTotal) {
    return (this.marketCap / marketTotal) * 100;
  }

  calculateFundCap() {
    return this.priceCoin * this.fundSup;
  }

  calculateGuardianCoin(guardianUSD) {
    return guardianUSD / this.priceCoin;
  }

  calculateGoalCap() {
    return this.fundCap * (this.marketPart / 100);
  }

  calculateGoalSup() {
    return this.goalCap / this.priceCoin;
  }

  calculateDefSup() {
    return this.fundSup - this.goalSup;
  }

  // Mint calculations
  calculateMintMetrics(mintUSD, fundTotal) {
    const mintSup = mintUSD / this.priceCoin;
    const fundTotalMint = fundTotal + mintUSD;
    const fundSupMint = this.fundSup + mintSup;
    
    const goalCapMint = fundTotalMint * (this.marketPart / 100);
    const goalSupMint = goalCapMint / this.priceCoin;
    const defPartMint = fundSupMint / goalSupMint;
    
    const downSupMint = goalSupMint * this.downCoef;
    const upSupMint = goalSupMint * this.upCoef;
    
    const realComMint = this.calculateRealCommission(
      fundSupMint,
      goalSupMint,
      upSupMint
    );
    
    const mintCom = mintSup * realComMint;
    const mintCost = mintSup + mintCom;

    return {
      mintSup,
      goalCapMint,
      goalSupMint,
      fundSupMint,
      defPartMint,
      downSupMint,
      upSupMint,
      realComMint,
      mintCom,
      mintCost
    };
  }

  // Burn calculations
  calculateBurnMetrics(burnUSD, fundTotal) {
    const burnSup = burnUSD / this.priceCoin;
    const fundTotalBurn = fundTotal - burnUSD;
    const fundSupBurn = this.fundSup - burnSup;
    
    const goalCapBurn = fundTotalBurn * (this.marketPart / 100);
    const goalSupBurn = goalCapBurn / this.priceCoin;
    const defPartBurn = fundSupBurn / goalSupBurn;
    
    const downSupBurn = goalSupBurn * this.downCoef;
    const upSupBurn = goalSupBurn * this.upCoef;
    
    const realComBurn = this.calculateRealCommission(
      fundSupBurn,
      goalSupBurn,
      upSupBurn
    );
    
    const burnCom = burnSup * realComBurn;
    const burnCost = burnSup - burnCom;

    return {
      burnSup,
      goalCapBurn,
      goalSupBurn,
      fundSupBurn,
      defPartBurn,
      downSupBurn,
      upSupBurn,
      realComBurn,
      burnCom,
      burnCost
    };
  }

  calculateRealCommission(fundSup, goalSup, upSup) {
    if (fundSup <= upSup) {
      if (fundSup < goalSup) {
        return this.calculateUnderCommission();
      }
      return this.calculateLineCommission();
    }
    return this.calculateOverCommission();
  }

  // Commission calculations - implement your specific commission logic here
  calculateUnderCommission() {
    // Implement your under commission calculation
    return 0.01;
  }

  calculateLineCommission() {
    // Implement your line commission calculation
    return 0.02;
  }

  calculateOverCommission() {
    // Implement your over commission calculation
    return 0.03;
  }
}