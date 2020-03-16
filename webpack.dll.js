const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: {
    lodash: ['lodash'], // 打包名：打包库
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash:10]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash:10]',
      path: resolve(__dirname, 'dll', 'manifest.json')
    }),
  ],
  mode: 'production'
};
