const Menu = require("../../models/menuModels");

function homeController() {
  // factory function = function that return objects.

  return {
    // object
    async index(req, res) {
      const pizza = await Menu.find();
      return res.render("home", { pizzass: pizza });

      // Menu.find().then(function (pizza) {
      //   console.log(pizza);
      //   res.render("home", { pizzas: pizza });
      // });
    },
  };
}

module.exports = homeController;
