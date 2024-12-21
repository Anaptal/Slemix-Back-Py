import axios from 'axios';

export async function proxyRequest(baseUrl, req, res, next) {
  try {
    const response = await axios({
      method: req.method,
      url: `${baseUrl}${req.url}`,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(baseUrl).host
      }
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
}