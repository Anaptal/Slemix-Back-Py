export const validateCalculateRequest = (req, res, next) => {
  const { cryptoId, mintUSD, burnUSD } = req.body;

  if (!cryptoId) {
    return res.status(400).json({ error: 'cryptoId is required' });
  }

  if (typeof mintUSD !== 'number' && typeof burnUSD !== 'number') {
    return res.status(400).json({ error: 'Either mintUSD or burnUSD must be provided as a number' });
  }

  if (mintUSD < 0 || burnUSD < 0) {
    return res.status(400).json({ error: 'USD values cannot be negative' });
  }

  next();
};