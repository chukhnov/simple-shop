const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'bundle.js'
    },
    plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, "client"), path.resolve(__dirname, "node_modules")],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|jpg|jpeg|png|JPG|woff|woff2|pdf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [path.resolve(__dirname, "client"), path.resolve(__dirname, "node_modules")],
                loader: "file-loader?name=../[path][name].[ext]"
            }
        ]
    }
};