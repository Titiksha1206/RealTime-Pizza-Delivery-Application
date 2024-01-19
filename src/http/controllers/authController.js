const User = require("../../models/userModels");
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },

    register(req, res) {
      res.render("auth/register");
    },

    postRegister(req, res) {
      // jo bhi data hmm send krne wale h vo hmme millega req.body se.
      const { name, email, password } = req.body; //name, email, password hmee millenge req.body se.

      // validate request.
      if (!name || !email || !password) {
        req.flash("error", "All fields are required.");
        return res.redirect("/register");
      }
      res.render("auth/postRegister");
    },
  };
}
module.exports = authController;
