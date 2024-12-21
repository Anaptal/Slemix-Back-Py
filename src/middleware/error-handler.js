export function errorHandler(err, req, res, next) {
  const status = err.response?.status || 500;
  const message = err.response?.data?.error || err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: message
  });
}