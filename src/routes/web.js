function initRoutes(app) {
  app.get("/", (req, res) => {
    //  home.ejs file is to keep html.
    res.render("home");
  });

  app.get("/cart", (req, res) => {
    // display cart page.
    res.render("customers/cart");
  });

  app.get("/login", (req, res) => {
    // display login page.
    res.render("auth/login");
  });

  app.get("/register", (req, res) => {
    // display register page.
    res.render("auth/register");
  });
}
//  jo bhi aapko iss file se export krna h .
module.exports = initRoutes;
