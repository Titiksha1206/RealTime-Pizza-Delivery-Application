const Order = require("../../../models/orderModels");
const moment = require("moment");
// const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

function orderController() {
  return {
    async store(req, res) {
      // console.log(req.body);

      // Validate request
      const { phone, address, stripeToken, paymentType } = req.body;

      if (!phone || !address) {
        //ajax.
        return res.status(422).json({ message: "All fields are required" });
        // req.flash("error", "All fields are required.");
        // return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id, // Set the customerId to the logged-in user's id.
        items: req.session.cart.items,
        phone,
        address,
      });

      // try {
      //   const result = await order.save();
      //   const placedOrder = await Order.populate(result, {
      //     path: "customerId",
      //   });
      //   // req.flash("success", "Order placed successfully");

      //   // Stripe payment
      //   if (paymentType === "card") {
      //     stripe.charges
      //       .create({
      //         amount: req.session.cart.totalPrice * 100,
      //         source: stripeToken,
      //         currency: "inr",
      //         description: `Pizza order: ${placedOrder._id}`,
      //       })
      //       .then(() => {
      //         placedOrder.paymentStatus = true;
      //         placedOrder.paymentType = paymentType;
      //         placedOrder
      //           .save()
      //           .then((ord) => {
      //             // Emit
      //             const eventEmitter = req.app.get("eventEmitter");
      //             eventEmitter.emit("orderPlaced", ord);

      //             //empty krenge cart ko.
      //             delete req.session.cart;

      //             return res.json({
      //               message: "Payment successful, Order placed successfully",
      //             });

      //             // return res.redirect("/customer/orders");
      //           })
      //           .catch((err) => {
      //             console.log(err);
      //           });
      //       })
      //       .catch((err) => {
      //         delete req.session.cart;
      //         return res.json({
      //           message:
      //             "OrderPlaced but payment failed, You can pay at delivery time",
      //         });
      //       });
      //   } else {
      //     delete req.session.cart;
      //     return res.json({ message: "Order placed succesfully" });
      //   }
      // } catch (err) {
      //   return res.status(500).json({ message: "Something went wrong" });
      // }

      order
        .save()
        .then((result) => {
          Order.populate(result, { path: "customerId" })
            .then((placedOrder) => {
              // req.flash('success', 'Order placed successfully')

              // Stripe payment
              if (paymentType === "card") {
                stripe.charges
                  .create({
                    amount: req.session.cart.totalPrice * 100,
                    source: stripeToken,
                    currency: "inr",
                    description: `Pizza order: ${placedOrder._id}`,
                  })
                  .then(() => {
                    placedOrder.paymentStatus = true;
                    placedOrder.paymentType = paymentType;
                    placedOrder
                      .save()
                      .then((ord) => {
                        // Emit
                        const eventEmitter = req.app.get("eventEmitter");
                        eventEmitter.emit("orderPlaced", ord);
                        delete req.session.cart;
                        return res.json({
                          message:
                            "Payment successful, Order placed successfully",
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    delete req.session.cart;
                    return res.json({
                      message:
                        "OrderPlaced but payment failed, You can pay at delivery time",
                    });
                  });
              } else {
                delete req.session.cart;
                return res.json({ message: "Order placed succesfully" });
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ message: "Something went wrong" });
            });
        })
        .catch((err) => {
          return res.status(500).json({ message: "Something went wrong" });
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
