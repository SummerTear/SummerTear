const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const srcPath = resolve(__dirname, '../src');

// https://github.com/ai/browserslist
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
    filename: 'static/js/[name].js',
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
      utils: resolve(srcPath, 'utils')
    },
    extensions: ['.js', '.jsx', '.json', '.styl']
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      {
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
        test: /\.styl$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [autoprefixer({ browsers: BROWSER_LIST })],
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  // https://webpack.js.org/configuration/plugins
  plugins: [
    // https://webpack.js.org/plugins/define-plugin
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(
      Object.assign({
        template: resolve(srcPath, 'index.ejs'),
        inject: false,
        resourcePath: '/',
        manifest: 'manifest.json',
        themeColor: '#ffffff',
        favIcon: 'favicon.ico',
        title: 'SummerTear'
      })
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ],

  // https://webpack.js.org/configuration/devtool
  devtool: 'cheap-module-eval-source-map',
  // https://webpack.js.org/configuration/stats
  stats: {
    colors: true
  },
  // https://webpack.js.org/configuration/dev-server
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    inline: true,
    quiet: true,
    proxy: { '/api': 'http://127.0.0.1:4000' },
    contentBase: resolve(__dirname, 'public'),
    historyApiFallback: true,
    disableHostCheck: true
  }
};
