const Order = require("../../../models/orderModels");

function statusController() {
  return {
    async update(req, res) {
      try {
        await Order.updateOne(
          { _id: req.body.orderId },
          { status: req.body.status }
        );
        //  Emit event
        const eventEmitter = req.app.get("eventEmitter");
        eventEmitter.emit("orderUpdated", {
          id: req.body.orderId,
          status: req.body.status,
        });

        return res.redirect("/admin/orders");
      } catch (error) {
        console.error("Error in updating order status:", error);
        return res.status(500).redirect("/admin/orders"); // Handle the error appropriately
      }
    },
  };
}
module.exports = statusController;
