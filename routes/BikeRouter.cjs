const express = require("express");
const BikeRouter = express.Router();
const { FetchBikes } = require("../controller/BikeController.cjs");

BikeRouter.post("/bikes", FetchBikes);

module.exports = BikeRouter;
