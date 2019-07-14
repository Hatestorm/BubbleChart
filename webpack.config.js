const path = require('path');
var webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
     mode: 'none',
     entry: './main.js',
     output: {
         filename: 'Bundle.js',
         path: path.resolve(__dirname)
     },
     plugins: [
        new webpack.ProvidePlugin({
            noUiSlider: 'nouislider'
        })
    ],

        devServer: {
        contentBase: './'
     },
    //watch:true,
        module: {
            rules: [
                {
                    test:/\.s?css/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                         
                    ]
                },
                {
                     test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                       use: [
                     'file-loader'
                    ]
                }
                
            ]
        }
}
