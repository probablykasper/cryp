const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].sass",
    disable: process.env.CRYP_ENV === "dev"
});

module.exports = [
    {
        entry: "./src/js/global.js",
        context: path.resolve(__dirname),
        output: {
            filename: "static/global.js",
            path: path.resolve(__dirname, "dist")
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules",
                query: {
                    presets: ["es2015"]
                }
            }]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                }
            }),
            new CopyWebpackPlugin([
                { from: "./src/modules", to: "modules", },
                { from: "./src/pug", to: "pug", },
                { from: "./src/static", to: "static", },
                { from: "./src/server.js", to: "server.js", }
            ])
        ]
    },
    {
        entry: "./src/sass/global.sass",
        context: path.resolve(__dirname),
        output: {
            filename: "sass.js",
            path: path.resolve(__dirname, "dist")
        },
        module: {
            rules: [{
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: "static/global.css"
            })
        ]
    }
]
