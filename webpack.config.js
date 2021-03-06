const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                { loader: "css-loader", options: { importLoaders: 1 } },
                "postcss-loader"
            ]
        }]
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true
    },
    plugins: [
        new DotenvWebpackPlugin()
    ]
};