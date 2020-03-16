const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// PWA 插件
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

// 统计打包时间分析工具
const smp = new SpeedMeasureWebpackPlugin();

// commonCss处理
// 开发模式用style-loader
const commonCSS = mode => {
  console.log('mode: ', mode);
  return [
    mode === 'development'
      ? 'style-loader' // 内部实现了HMR功能
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [require('postcss-preset-env')],
      },
    },
  ];
};

const commonConfig = mode => ({
  mode,
  entry: {
    main: './src/app/index.js',
    // test: './src/app/test.js'
  },
  output: {
    filename: mode === 'development' ? 'js/[name].[hash:10].js' : 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    // [
                    // //   这种方法不适合开发类库使用， @babel/polyfill会污染全局环境
                    //   {
                    //     // 按需加载
                    //     useBuiltIns: 'usage',
                    //     // 指定core-js版本
                    //     corejs: {
                    //       version: 3,
                    //     },
                    //   },
                    // ],
                  ],
                  // 这种方法适合开发类库使用
                  plugins: [
                    [
                      '@babel/plugin-transform-runtime',
                      {
                        helpers: true,
                        regenerators: true,
                        useESModules: false,
                        corejs: 3,
                      },
                    ],
                  ],
                  // 开启babel缓存
                  cacheDirectory: mode === 'development' ? false : true,
                },
              },
              {
                loader: 'eslint-loader',
                options: {
                  fix: true,
                },
              },
            ],
          },
          {
            // 处理css文件
            test: /\.css$/,
            use: [...commonCSS(mode)],
          },
          {
            // 处理sass文件
            test: /\.scss$/,
            use: [...commonCSS(mode), 'sass-loader'],
          },
          {
            // 下载代码中包含的图片资源
            test: /\.(jpg|jpeg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[contenthash:10].[ext]',
              outputPath: 'images',
              esModule: false,
            },
          },
          {
            // 下载html中的图片资源
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            // 其他资源（字体等等...）
            exclude: /\.(js|css|scss|less|jpg|jpeg|png|gif|html)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: '[contenthash:10].[ext]',
            },
          },
        ],
      },
    ],
  },
  // cdn外部链接引用
  externals: {
    lodash: 'lodash',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      // 压缩html代码
      minify:
        mode === 'development'
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
            },
    }),
    // PWA
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true, // 更快启动serviceWorker
      skipWaiting: true, // 删除旧的文件
    }),
  ],
});

module.exports = mode => {
  let config;

  // 设置postcss兼容性, browserslist为开发模式, 默认为生产模式
  process.env.NODE_ENV = mode;

  if (mode === 'production') {
    config = merge(commonConfig(mode), prodConfig, { mode });
  } else {
    config = merge(commonConfig(mode), devConfig, { mode });
  }

  return smp.wrap(config);
};
