/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const packageFile = __dirname + '/../package.json';
const manifestFile = __dirname + '/../public/manifest.json';

const packageVersion = require(packageFile).version;

const manifest = require(manifestFile);

if (manifest.version !== packageVersion) {
  console.log("Updating manifest from version " + manifest.version + " to " + packageVersion);

  const fs = require('fs');

  fs.readFile(manifestFile, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/"version": ".*"/g, '"version": "' + packageVersion + '"');


    fs.writeFile(manifestFile, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}