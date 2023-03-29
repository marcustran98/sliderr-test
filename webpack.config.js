module.exports = {
    entry: './src/index.ts',
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
        ]
    },

}