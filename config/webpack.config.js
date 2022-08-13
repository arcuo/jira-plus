'use strict';

const { merge } = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    mode: "production",
    entry: {
      popup: PATHS.src + '/popup.ts',
      content: PATHS.src + '/content.ts',
      background: PATHS.src + '/background.ts',
    },
    output: {
      path: PATHS.build,
      filename: "[name].js",
   },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
  });

module.exports = config;
