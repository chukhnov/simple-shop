var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'client/index.js'),
    watch: true,
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'bundle.js'
    },
    module: {

        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: [/client/, /node_modules/],
                use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|jpg|jpeg|png|JPG|woff|woff2|pdf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [/client/, /node_modules/],
                use:[
                    {
                        loader: "file-loader?name=../[path][name].[ext]"
                    }
                ]
            }
        ]
    }
};
