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
      content: PATHS.src + '/content.ts',
      background: PATHS.src + '/background.ts',
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
      // If added, copy webcomponent assets o `build` folder
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'node_modules/jira-plus-webcomponents/dist/jira-plus-webcomponents/assets'),
      //       to: path.resolve(__dirname, 'build/assets'),
      //     },
      //   ],
      // }),
    ],
  });

module.exports = config;
