module.exports = ({ file }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        autoprefixer: {
            browsers: [
                'Chrome >= 52',
                'FireFox >= 44',
                'Safari >= 7',
                'Explorer 11',
                'last 4 Edge versions',
            ],
        },
    },
});
