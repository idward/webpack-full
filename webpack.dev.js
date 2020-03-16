const { resolve } = require('path');

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    port: 4000,
    open: true,
    hot: true,
  },
  devtool: 'eval-source-map',
};
