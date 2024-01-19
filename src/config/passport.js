const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModels");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        //login logic

        //check if email exists.
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "No user with this email." });
        }

        // password checking
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in successfully." });
            }
            return done(null, false, {
              message: "Wrong username or password.",
            });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong." });
          });
      }
    )
  );

  // agr user loggin ho jata h toh hmee session ke andr user ki id(your choice) ko store krte h , usse hmme pata chlta h ki user loggin h ya nhii haii..

  passport.serializeUser((user, done) => {
    // done(null, user._id); // yaha pr aapko jo store krna haii session ke andr vo likho; eg=(user.email)....

    process.nextTick(function () {
      return done(null, {
        id: user.id,
      });
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(function () {
      return done(null, user);
    });
  });
}

module.exports = init;
