const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

/**
 * tree shaking 减少代码提及
 *  1. ES6模块化
 *  2. 模式为生产模式
 *  注意：sideEffects: false 会把css干掉 所以要设置sideEffects: ["*.css"]
 */

module.exports = {
  devtool: 'source-map',
  plugins: [
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([
    //   {
    //     // HardSource works with mini-css-extract-plugin but due to how
    //     // mini-css emits assets, assets are not emitted on repeated builds with
    //     // mini-css and hard-source together. Ignoring the mini-css loader
    //     // modules, but not the other css loader modules, excludes the modules
    //     // that mini-css needs rebuilt to output assets every time.
    //     test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    //   },
    // ]),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
};
