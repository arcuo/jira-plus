'use strict';

const { merge } = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    mode: 'production',
    entry: {
      popup: PATHS.src + '/popup.ts',
      background: PATHS.src + '/background.ts',
      "branchNames.content": PATHS.src + '/content/branchNames.content.ts',
      "styling.content": PATHS.src + '/content/styling.content.ts',
      "epics.content": PATHS.src + '/content/epics.content.ts',
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: { outputPath: '.', name: '[name].css' },
            },
            'sass-loader',
          ],
        },
      ],
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      // Copy static assets from `public` folder to `build` folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/manifest.json',
            context: 'public',
          },
        ],
      }),
    ],
  });

module.exports = config;
