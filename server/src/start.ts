/**

 * Required External Modules

 */

import express from "express";
import { createDefualtCategoriesRouter } from "./router/categories.router";
/**
 
  * App Variables
 
  */

export const app = express();

app.get("/test", function (req, res) {
  res.send("Hello from the root application URL");
});

/**
 
  * App Configuration
 
  */

app.use(express.json());
app.use("/categories", createDefualtCategoriesRouter());
