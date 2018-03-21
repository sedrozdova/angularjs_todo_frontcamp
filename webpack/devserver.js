module.exports = function returnDevServerConfig() {
    return {
        devServer: {
            proxy: [{
                path: '/api/',
                target: 'http://localhost:9000', // port of mock server
            }],
            historyApiFallback: true,
        },
    };
};
