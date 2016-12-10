module.exports = function serializeQuery(q) {
  var qs = "?", keys = Object.keys(q);

  for(var i = 0; i < keys.length; i++) {
    qs += keys[i] + "=" + q[keys[i]];
    i < (keys.length - 1) ? qs += "&" : false;
  }
  return qs;
};
