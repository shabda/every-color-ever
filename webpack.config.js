const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/browser.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
