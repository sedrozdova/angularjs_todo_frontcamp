module.exports = function returnPugConfig() {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        query: {},
                    },
                },
            ],
        },
    };
};
