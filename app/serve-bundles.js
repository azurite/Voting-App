/*
 * Grabs the location of all assets generated from webpack at the designated destination
 * and returns them so that they can be included in the pug template for server side rendering
 */

const fs = require("fs");
const path = require("path");

module.exports = function(options) {
  const fullpath = path.join(options.root, options.path);
  const assets = {
    styles: [],
    scripts: []
  };

  fs.readdirSync(fullpath)
    .filter((data) => {
      if(fs.statSync(path.join(fullpath, data)).isFile()) {
        return ~[".js", ".css"].indexOf(data.slice(data.lastIndexOf(".")));
      }
    })
    .forEach((file) => {
      if(file.slice(file.lastIndexOf(".")) === ".css") {
        assets.styles.push(file);
      }
      if(file.slice(file.lastIndexOf(".")) === ".js") {
        assets.scripts.push(file);
      }
    });

  return assets;
};
