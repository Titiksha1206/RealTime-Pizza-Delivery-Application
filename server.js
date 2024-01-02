const express = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");

// inbuilt module h .
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  //  home.ejs file to keep html.
  res.render("home");
});

app.listen(port, () => {
  console.log(`server is running at Port: ${port}`);
});

// assets
app.use(express.static("public"));

// express ko pata chlega ki konsa layout yaha pr use krna h.
app.use(expressEjsLayouts);

// express ko hme batana h ki jo hmari views folder (contains html file) vo kaha pr h .
app.set("views", path.join(__dirname, "/resources/views"));

// set Template engine (express ko batana h ki hmm konsa template engine use krne wale h ).
app.set("view engine", "ejs");
