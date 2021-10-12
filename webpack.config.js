const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: [
        "react-hot-loader/patch",
        "./src/main.tsx"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name].css"
        }),
    ],  
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".tsx",
            ".ts"
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    devServer: {
        contentBase: "./dist",
        port: 1234
    }
};

module.exports = config;