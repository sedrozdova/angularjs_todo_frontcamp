const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function returnHTMLConfig(pathToTemplates) {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: `${pathToTemplates}/index.html`,
            }),
        ],
    };
};
