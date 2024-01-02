const express = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`server is running at Port: ${port}`);
});

// set Template engine
app.use(expressEjsLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
