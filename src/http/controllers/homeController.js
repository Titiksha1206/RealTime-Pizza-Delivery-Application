function homeController() {
  // factory function = function that return objects.

  return {
    // object

    index(req, res) {
      res.render("home");
    },
  };
}

module.exports = homeController;
