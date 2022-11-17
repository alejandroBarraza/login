const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://localhost:4000',
            target: 'https://login-db-node.herokuapp.com',
            changeOrigin: true,
        })
    )
}
