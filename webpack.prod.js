const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * tree shaking 减少代码提及
 *  1. ES6模块化
 *  2. 模式为生产模式
 *  注意：sideEffects: false 会把css干掉 所以要设置sideEffects: ["*.css"]
 */

module.exports = {
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
