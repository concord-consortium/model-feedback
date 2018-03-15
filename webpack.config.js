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
    'demo': ["./src/demo.ts"],
    'tester': ["./src/components/dt-test-view.tsx"]
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
