module.exports = (function media() {
  const MEDIA = (function(env) {
    if(env.NODE_ENV === "production" || env.FULL_STACK === "fullstack") {
      return "/media";
    }
    return "/client/media";
  }(process.env));
  return MEDIA;
}());
