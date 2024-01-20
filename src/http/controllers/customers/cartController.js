const { json } = require("express");

function cartController() {
  return {
    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      //basic structure should look like this.
      // let cart = {
      //     items: {
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //     },
      //     totalQty: 0,
      //     totalPrice: 0
      // }

      // for the first time creating cart.
      // session ke andr check agr cart nhi h toh ek empty cart create kro.
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }

      let cart = req.session.cart;

      // check jo item hmm add krna chahate hai cart ke andr vo haii ya nhi, agr nhi h toh add kro items ke andr aur agr haii toh sirph quantity ko increase kro.

      if (!cart.items[req.body._id]) {
        // item nhi h.
        cart.items[req.body._id] = {
          item: req.body, // item ko add kr rhe h means ki pizza ki id,image,size,price sab kuch add krenge.
          qty: 1,
        };

        cart.totalQty = cart.totalQty + 1; // jo items phehle se add kr rkhe the, usme ek aur item add krenge.

        cart.totalPrice = cart.totalPrice + req.body.price; // iss item ka bhi price add krenge, phehle ke items ke total price maii.
      } else {
        // item haii.
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;

        cart.totalQty = cart.totalQty + 1;

        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      // cart ke logo mai show ho ki cart mai total kitne items add h.
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}
module.exports = cartController;
