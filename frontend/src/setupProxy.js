const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://banking-application-ieks.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
      onError: (err, req, res) => {
        console.warn('Proxy Error: Backend server is not running on port 3001');
        console.warn('Please start the backend with: cd backend && npm start');
        res.status(503).json({
          error: 'Backend server is unavailable. Please ensure the backend is running on port 3001.',
        });
      },
    })
  );

  // Ignore favicon.ico requests to prevent proxy errors
  app.use('/favicon.ico', (req, res) => {
    res.status(204).send();
  });
};
