const ServerSideSecurity = require('../middleware/ServerSideSecurity.cjs');
const { AddNewBike, RemoveBike } = require('../controller/AdminOpsController.cjs');
const express = require('express');
const AdminOpsRouter = express.Router();
AdminOpsRouter.post('/admin/addnewbike', ServerSideSecurity, AddNewBike);
AdminOpsRouter.delete('/admin/removebike', ServerSideSecurity, RemoveBike);
module.exports = AdminOpsRouter;