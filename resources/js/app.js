// import axios from "axios";
const axios = require("axios");
const moment = require("moment");
const initAdmin = require("../../resources/js/admin");

let addToCart = document.querySelectorAll(".add-to-cart"); // queryselectorAll krna h kyuki sare buttons hme chahiye haii.

let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  // server ko request bhjenge aur pizza jiss pr hmne click kiya h usko add krvayenge cart ke andr.
  //axios ko use kr rhe h.

  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
    })
    .catch((error) => {
      console.log(error);
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // server ko request bhjenge aur pizzas ko add krvayenge cart ke andr.

    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

// Remove alert message after X seconds
const alertMsg = document.querySelector(".alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

initAdmin();
