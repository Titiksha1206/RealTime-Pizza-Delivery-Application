const homeController = require("../http/controllers/homeController");
const authController = require("../http/controllers/authController");
const cartController = require("../http/controllers/customers/cartController");
const orderController = require("../http/controllers/customers/orderController");
const adminOrderController = require("../http/controllers/admin/orderController");

//middlewares
const guest = require("../http/middlewares/guest");
const auth = require("../http/middlewares/auth");
const admin = require("../http/middlewares/admin");

function initRoutes(app) {
  app.get("/", homeController().index);

  app.get(
    "/login",
    guest, //middleware ko apply krna h toh as a second parameter pass krte h.
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

  //customers route.
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);

  //admin routes
  app.get("/admin/orders", admin, adminOrderController().index);
}

//  jo bhi aapko iss file se export krna h .
module.exports = initRoutes;
