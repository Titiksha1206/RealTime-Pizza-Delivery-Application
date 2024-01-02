import express from "express";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.render(__dirname);
// });

app.listen(port, () => {
  console.log(`server is running at Port: ${port}`);
});

// set Template engine
app.use(expressEjsLayouts);
app.set("view engine", "ejs");

const home = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(home);

export { app };
