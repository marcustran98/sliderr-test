const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        clean: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
        ]
    },

}