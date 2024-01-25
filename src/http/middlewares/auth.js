// only loggin users can access some routes.

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    //yeh hme batayega ki user logged in haii ya nhi.
    return next();
  }
  return res.redirect("/login");
}

module.exports = auth;
