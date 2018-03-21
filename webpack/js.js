module.exports = function returnJSConfig() {
    return {
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: [/node_modules/],
                    use: 'babel-loader',
                },
            ],
        },
    };
};
