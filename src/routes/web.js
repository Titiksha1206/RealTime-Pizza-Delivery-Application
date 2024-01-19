const homeController = require("../http/controllers/homeController");
const authController = require("../http/controllers/authController");
const cartController = require("../http/controllers/customers/cartController");
const orderController = require("../http/controllers/customers/orderController");

function initRoutes(app) {
  app.get("/", homeController().index);

  app.get(
    "/login",
    authController().login
    // display login page.
  );

  app.get(
    "/register",
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
}

//  jo bhi aapko iss file se export krna h .
module.exports = initRoutes;
