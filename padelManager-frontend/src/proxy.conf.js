/*const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Servidor de backend en localhost:8080
      changeOrigin: true,
      secure: false, // Cambia a true si tu servidor de backend usa HTTPS
      pathRewrite: {
        '^/api': '', // Elimina "/api" de la solicitud enviada al servidor de backend
      },
    })
  );
};
*/