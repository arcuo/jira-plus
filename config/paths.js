'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  root: path.resolve(__dirname, '../'),
  public: path.resolve(__dirname, '../public'),
};

module.exports = PATHS;
