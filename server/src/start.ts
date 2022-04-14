/**

 * Required External Modules

 */

import express from "express";
//TODO: Don't forget to import routers here
/**
 
  * App Variables
 
  */

export const app = express();

/**
 
  * App Configuration
 
  */

app.use(express.json());

//app.use("/ROUTE", ROUTER);
