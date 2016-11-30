module.exports = (function media() {
  const MEDIA = (function(env) {
    if(env === "production") {
      return "/media";
    }
    return "/client/media";
  }(process.env.NODE_ENV));
  return MEDIA;
}());
