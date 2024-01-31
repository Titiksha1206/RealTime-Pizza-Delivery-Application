const axios = require("axios");

export function placeOrder(formObject) {
  axios
    .post("/orders", formObject)
    .then((res) => {
      // console.log(res.data);
      window.location.href = "/customer/orders";
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(formObject);
}
