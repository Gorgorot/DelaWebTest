var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var os = require('os');
var AutoDllPlugin = require('autodll-webpack-plugin');

const isDevelopment = true;

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/, 
        query: {
          cacheDirectory: true, 
          presets:["@babel/preset-env", "@babel/preset-react"]
        }
      }, {
        test: /\.(svg|jpg|png|gif|ttf|eot|woff|otf)$/,
        loader: "url-loader?limit=300000"
      }, {
        test: /\.less$/,
        use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'less-loader',
                options: {
                    strictMath: true,
                    noIeCompat: true,
                },
            }]  
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        }, {
          test: /\.scss$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
      }    
    ]
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("static/styles.css"),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      env: process.env.NODE_ENV,
      minify: {
          removeComments: !isDevelopment,
          collapseWhitespace: !isDevelopment,
          removeRedundantAttributes: !isDevelopment,
          useShortDoctype: !isDevelopment,
          removeEmptyAttributes: !isDevelopment,
          removeStyleLinkTypeAttributes: !isDevelopment,
          keepClosingSlash: !isDevelopment,
          minifyJS: !isDevelopment,
          minifyCSS: !isDevelopment,
          minifyURLs: !isDevelopment
        }
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: 'vendor.js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'redux',
          'react-redux',
          'react-router',
          'react-router-dom'
        ]
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 4000,
    hot: true,
    open: true,
    contentBase: './build'
  }
};