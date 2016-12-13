module.exports = (function media() {
  var event;
  if(process) {
    event = process.env.npm_lifecycle_event;
  }

  switch(event) {
    case "dev-server":
      return "/client/media";

    default:
      return "/media";
  }
}());
