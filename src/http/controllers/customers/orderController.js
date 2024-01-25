const Order = require("../../../models/orderModels");
const moment = require("moment");

function orderController() {
  return {
    store(req, res) {
      //   console.log(req.body);

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
          //empty krenge cart ko.
          delete req.session.cart;
          return res.redirect("/customer/orders");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          //   console.log(err);
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      // fetching orders.
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 }, // sort in such way that new orders will come up.
      }); // jobhi logged in user hai uske jitne bhi orders haii yaha pr hmm usse fetch kr rhe h.
      // res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment }); // frontend pr(order.ejs file) display karvaye data.
      // console.log(orders);
    },
  };
}
module.exports = orderController;
