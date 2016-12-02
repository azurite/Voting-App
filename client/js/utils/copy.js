//copies an array of objects
module.exports = function copy(po) {
  var copy = [];
  for(var i = 0; i < po.length; i++) {
    var copyOpt = {};
    for(var prop in po[i]) {
      if(po[i].hasOwnProperty(prop)) {
        copyOpt[prop] = po[i][prop];
      }
    }
    copy.push(copyOpt);
  }
  return copy;
};
