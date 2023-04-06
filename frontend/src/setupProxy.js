const { createProxyMiddleware } = require("http-proxy-middleware");

const HOST_ADDRESS = process.env.HOST_ADDRESS
  ? process.env.HOST_ADDRESS
  : `localhost:8080`;

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://" + HOST_ADDRESS,
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    createProxyMiddleware("/subscribe", {
      target: "wss://" + HOST_ADDRESS,
      ws: true,
      changeOrigin: true,
      secure: false,
    })
  );
};
