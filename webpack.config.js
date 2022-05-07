const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    // сервер разработки
    mode: 'development',
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname, './dist'),
        hot: false,
        open: true,
        compress: true,
        port: 8080,
    },
    // плагины
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Virtual keyboard',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '**/*',
                '!.git'
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
}