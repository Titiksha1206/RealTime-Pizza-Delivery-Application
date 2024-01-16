const express = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const path = require("path"); // inbuilt module h .

const app = express();

const port = process.env.PORT || 3000;

// database connections.
const url = "mongodb://127.0.0.1";
mongoose.connect(url, {});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected…");
  })
  .on("error", (err) => {
    console.log("Connection failed...");
  });

// assets
app.use(express.static("public"));

// express ko pata chlega ki konsa layout yaha pr use krna h.
app.use(expressEjsLayouts);

// express ko hme batana h ki jo hmari views folder (contains html file) vo kaha pr h .
app.set("views", path.join(__dirname, "/resources/views"));

// set Template engine (express ko batana h ki hmm konsa template engine use krne wale h ).
app.set("view engine", "ejs");

// always put app.get() statement after setting the ejs layout .

//  web.js file mai jiss function ko export kiya h usko yaha pr import krenge.
// symbol(./) = current folder.
require("./src/routes/web")(app);

app.listen(port, () => {
  console.log(`server is running at Port: ${port}`);
});
