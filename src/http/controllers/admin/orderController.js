const order = require("../../../models/orderModels");
function orderController() {
  return {
    index(req, res) {
      order
        .find(
          {
            status: { $ne: "completed" }, //completed orders hai toh hmee fetch nhi krna h.
          },
          null,
          {
            sort: { createdAt: -1 },
          }
        )
        .populate("customerId", "-password") //user ka data fetch ho jayega pura.
        .then((orders) => {
          if (req.xhr) {
            return res.json(orders);
          } else {
            return res.render("admin/orders");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };
}

module.exports = orderController;
