const express = require('express');
const PurchaseBikeRouter = express.Router();
const { PurchaseBike } = require('../controller/BikeController.cjs');
const ServerSideSecurity = require('../middleware/ServerSideSecurity.cjs');

PurchaseBikeRouter.post('/purchasebike', ServerSideSecurity, PurchaseBike);

module.exports = PurchaseBikeRouter