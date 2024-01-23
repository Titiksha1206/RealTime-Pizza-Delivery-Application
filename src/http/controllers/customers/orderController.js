const Order = require("../../../models/orderModels");

function orderController() {
  return {
    store(req, res) {
      console.log(req.body);

      // Validate request
      const { phone, address } = req.body;

      if (!phone || !address) {
        //  return res.status(422).json({ message : 'All fields are required' });
        req.flash("error", "All fields are required.");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/cart");
        });
    },
  };
}
module.exports = orderController;
