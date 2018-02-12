/* global module:true, require:true __dirname */

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    'model-feedback-lib': ["./src/index.ts"],
    'aquifer1': ["./src/lara-approved-scripts/aquifer1.ts"],
    'feedbackView': ["./src/lara-approved-scripts/feedback-view.ts"],
    // TODO: Minimize this again later
    // 'model-feedback-lib.min': ["./src/index.ts"],
    'demo': ["./src/demo.ts"]
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
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "./tsconfig.json"}
        },
    ]
  },
  stats: {
    colors: true
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: 'html/**/*.html',
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
