module.exports = function(app) {
  app.post("/api/logout", (req, res) => {
    if(req.user) {
      req.logout();
      res.json({ logout: "success" });
    }
    else {
      res.json({ logout: "already logged out" });
    }
  });
};
