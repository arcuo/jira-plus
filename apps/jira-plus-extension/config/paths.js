'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  packages: path.resolve(__dirname, '../../../packages'),
};

module.exports = PATHS;
