module.exports = {
    entry: "./app/App.js",
    output: {
        filename: "public/bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel"}
        ]
    }
};
