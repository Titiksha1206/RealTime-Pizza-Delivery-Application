const Order = require("../../../models/orderModels");
const moment = require("moment");
const { ObjectId } = require("mongodb");

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
        customerId: req.user._id, // Set the customerId to the logged-in user's id.
        items: req.session.cart.items,
        phone,
        address,
      });

      // try {
      //   const result = await order.save();
      //       const placedOrder = await Order.populate(result, { path: "customerId" });
      //       req.flash("success", "Order placed successfully");
      //       delete req.session.cart;
      //       // Emit
      //       const eventEmitter = req.app.get("eventEmitter");
      //       eventEmitter.emit("orderPlaced", placedOrder);

      //       //empty krenge cart ko.

      //       return res.redirect("/customer/orders");

      //   }
      //   catch(err)  {
      //     req.flash("error", "Something went wrong");
      //     //   console.log(err);
      //     return res.redirect("/cart");
      //   };

      order
        .save()
        .then((result) => {
          // Populate the user details in the order
          Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
            if (err) {
              console.error(err);
              req.flash("error", "Something went wrong");
              return res.redirect("/cart");
            }
            req.flash("success", "Order placed successfully");
            // Emit
            const eventEmitter = req.app.get("eventEmitter");
            eventEmitter.emit("orderPlaced", placedOrder);

            //empty krenge cart ko.
            delete req.session.cart;
            return res.redirect("/customer/orders");
          });
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

    async show(req, res) {
      const order = await Order.findById(req.params._id);

      //authorize user.

      if (JSON.stringify(req.user._id) === JSON.stringify(order.customerId)) {
        return res.render("customers/singleOrder", { order });
      }
      return res.redirect("/");
    },
  };
}
module.exports = orderController;
