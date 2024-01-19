const User = require("../../models/userModels");
const bcrypt = require("bcrypt");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },

    register(req, res) {
      res.render("auth/register");
    },

    async postRegister(req, res) {
      // jo bhi data hmm send krne wale h vo hmme millega req.body se.
      const { name, email, password } = req.body; //name, email, password hmee millenge req.body se.

      // validate request.
      if (!name || !email || !password) {
        req.flash("error", "All fields are required.");

        // error anne pr dala hua data erase nhi hona chahiye.
        req.flash("name", name);
        req.flash("email", email);

        return res.redirect("/register");
      }

      // email should be unique at each registration.
      // check if email exists.
      const userr = await User.exists({ email: email });
      //agr already database ke andr email exist krta hai toh error showkro.
      if (userr) {
        req.flash("error", "Email already taken");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // hash password.
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a user.
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          // login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong.");
          return res.redirect("/register");
        });
    },
  };
}
module.exports = authController;
