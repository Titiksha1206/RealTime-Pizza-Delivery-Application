const homeController = require("../http/controllers/homeController");
const authController = require("../http/controllers/authController");
const cartController = require("../http/controllers/customers/cartController");
const orderController = require("../http/controllers/customers/orderController");
const guest = require("../http/middlewares/guest");

function initRoutes(app) {
  app.get("/", homeController().index);

  app.get(
    "/login",
    guest,
    authController().login
    // display login page.
  );
  app.post("/login", authController().postLogin);

  app.get(
    "/register",
    guest,
    authController().register
    // display register page.
  );
  app.post("/register", authController().postRegister);

  app.get(
    "/cart",
    cartController().index
    // display cart page.
  );
  app.post("/update-cart", cartController().update);

  app.post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });
}

//  jo bhi aapko iss file se export krna h .
module.exports = initRoutes;
