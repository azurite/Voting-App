module.exports = function format(date) {
  try {
    var d = new Date(date).toString();
  } catch(e) {
    return "unknown";
  }
  d = d.split(" ");
  d.splice(d.length - 2);
  return d.join(" ");
};
