const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = resolve(__dirname, '../src');
const RESOURCE_PATH = '/'; //TODO 将来填CDN地址
const BROWSER_LIST = ['>1%', 'last 2 versions', 'IE >= 9'];

module.exports = {
  // https://webpack.js.org/configuration/target
  target: 'web',
  // https://webpack.js.org/configuration/entry-context
  entry: {
    bundle: resolve(__dirname, '../src'),
    polyfills: resolve(__dirname, './polyfills')
  },
  // https://webpack.js.org/configuration/output
  output: {
    path: resolve(__dirname, '../build'),
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash:5].js',
    chunkFilename: 'static/js/[name].chunk.[chunkhash:5].js'
  },
  // https://webpack.js.org/configuration/resolve
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      actions: resolve(srcPath, 'actions'),
      api: resolve(srcPath, 'api'),
      components: resolve(srcPath, 'components'),
      constants: resolve(srcPath, 'constants'),
      containers: resolve(srcPath, 'containers'),
      pages: resolve(srcPath, 'pages'),
      layouts: resolve(srcPath, 'layouts'),
      reducers: resolve(srcPath, 'reducers'),
      store: resolve(srcPath, 'store'),
      logics: resolve(srcPath, 'logics'),
      styles: resolve(srcPath, 'styles'),
      utils: resolve(srcPath, 'utils'),
      'async-component': resolve(srcPath, 'components/async')
    },
    extensions: ['.js', '.jsx', '.json', '.styl']
  },
  // https://webpack.js.org/configuration/resolve/#resolveloader
  resolveLoader: {
    alias: {
      async: resolve(__dirname, './async-component-loader')
    }
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            // https://github.com/babel/babel-loader
            loader: 'babel-loader',
            options: {
              presets: [['env', { targets: { browsers: BROWSER_LIST } }]],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread',
                ['transform-react-jsx', { pragma: 'h' }]
              ]
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: resolve(srcPath, 'pages'),
        use: [
          {
            loader: resolve(__dirname, './async-component-loader'),
            options: {
              name(filename) {
                let relative = filename.replace(srcPath, '');
                let isPage = filename.indexOf('/pages/') >= 0;

                return isPage
                  ? 'page-' +
                      relative.replace(/(^\/(pages)\/|(\/index)?\.js$)/g, '')
                  : false;
              },
              formatName(filename) {
                let relative = filename.replace(srcPath, '');
                return relative.replace(/(^\/(pages)\/|(\/index)?\.js$)/g, '');
              }
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [autoprefixer({ browsers: BROWSER_LIST })],
              sourceMap: false
            }
          },
          { loader: 'stylus-loader', options: { sourceMap: false } }
        ])
      }
    ]
  },
  // https://webpack.js.org/configuration/plugins
  plugins: [
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['build'], resolve(__dirname, '../')),
    // https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{ from: resolve(__dirname, '../public') }]),
    // https://webpack.js.org/plugins/define-plugin
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:5].css',
      allChunks: true
    }),
    // https://webpack.js.org/plugins/commons-chunk-plugin
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: false,
      minChunks: 3
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(
      Object.assign({
        template: resolve(srcPath, 'index.ejs'),
        inject: false,
        resourcePath: RESOURCE_PATH,
        manifest: 'manifest.json',
        themeColor: '#ffffff',
        favIcon: 'favicon.ico',
        title: 'SummerTear',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
    ),
    //TODO 完成service worker
    /*
      new SWPrecacheWebpackPlugin({

      }),*/
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      mangle: true,
      sourceMap: true,
      compress: {
        properties: true,
        keep_fargs: false,
        pure_getters: true,
        collapse_vars: true,
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: false,
        pure_funcs: [
          'classCallCheck',
          '_classCallCheck',
          '_possibleConstructorReturn',
          'Object.freeze',
          'invariant',
          'warning'
        ]
      }
    })
  ],
  bail: true,
  stats: 'errors-only'
};
