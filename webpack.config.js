/* global module:true, require:true __dirname */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'trap': ["./src/lara-approved-scripts/trap.ts"],
    'aquifer': ["./src/lara-approved-scripts/aquifer.ts"],
    'supply': ["./src/lara-approved-scripts/supply.ts"],
    'feedbackView': ["./src/lara-approved-scripts/feedback-view.ts"],
    'debugging': ["./src/lara-approved-scripts/event-debugging.ts"],
    // TODO: Minimize this again later
    // 'model-feedback-lib.min': ["./src/index.ts"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@concord-consortium/lara-plugin-api': 'LARA.PluginAPI'
  },
  plugins: [
    new CleanWebpackPlugin(["dist/"], {}),
    new CopyWebpackPlugin([{
      from: 'html/**/*',
      to: '',
      flatten: true
    }])
  // TODO: Minimize again sometime
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     sourceMap: true,
  //     include: /\.min\.js$/,
  //   })
  ]
};
