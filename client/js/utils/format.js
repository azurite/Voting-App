module.exports = function format(time) {
  var date = new Date(time);
  if(date.toString() === "Invalid Date") {
    return "unknown";
  }
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

  var m = date.getMonth();
  var d = date.getDate();
  var y = date.getFullYear();

  return months[m] + " " + d + " " + y;
};
