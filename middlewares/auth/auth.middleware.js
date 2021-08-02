module.exports = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    console.log('req.isAuthenticated ===>>', req.isAuthenticated());
    if (req.session) {
      console.log('req.session ===>>', req.session());
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect('/login');
  }
  next();
};
