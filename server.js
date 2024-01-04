const express = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");

// inbuilt module h .
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

// assets
app.use(express.static("public"));

// express ko pata chlega ki konsa layout yaha pr use krna h.
app.use(expressEjsLayouts);

// express ko hme batana h ki jo hmari views folder (contains html file) vo kaha pr h .
app.set("views", path.join(__dirname, "/resources/views"));

// set Template engine (express ko batana h ki hmm konsa template engine use krne wale h ).
app.set("view engine", "ejs");

// always put get statement after setting the  ejs layout .
app.get("/", (req, res) => {
  //  home.ejs file is to keep html.
  res.render("home");
});

app.get("/cart", (req, res) => {
  // display cart page.
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  // display login page.
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  // display register page.
  res.render("auth/register");
});

app.get("/cart", (req, res) => {
  // display cart page.
  res.render("customers/cart");
});

app.listen(port, () => {
  console.log(`server is running at Port: ${port}`);
});
