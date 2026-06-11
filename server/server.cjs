const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const express = require("express");
const BikeRouter = require("../routes/BikeRouter.cjs");
const BikeDetailsRouter = require('../routes/BikeDetailsRouter.cjs');
const SignUpRouter = require("../routes/SignUpRouter.cjs");
const LogInRouter = require("../routes/LogInRouter.cjs");
const NewAccessTokenRouter = require("../routes/NewAccessTokenRouter.cjs");
const AccountInformationRouter = require("../routes/AccountInformationRouter.cjs");
const FindBikeRouter = require("../routes/FindBikeRouter.cjs");
const cors = require("cors");
const CookieParser = require("cookie-parser");
const ConnectToUserDB = require("../model/ConnectToUserDB.cjs");
const ServerSideSecurity = require('../middleware/ServerSideSecurity.cjs');
const PurchaseBikeRouter = require('../routes/PurchaseBikeRouter.cjs');
const AdminCheckRouter = require('../routes/AdminCheckRouter.cjs');
const AdminOpsRouter = require('../routes/AdminOpsRouter.cjs');

ConnectToUserDB();

const App = express();
App.use(express.json({ limit: '50mb' }));
App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
App.use(CookieParser());

App.use('/', SignUpRouter);
App.use('/', LogInRouter);
App.use('/', AccountInformationRouter);
App.use('/', BikeRouter);
App.use('/', FindBikeRouter);
App.use('/', BikeDetailsRouter);
App.use('/', PurchaseBikeRouter);
App.use('/', NewAccessTokenRouter);
App.use('/', AdminCheckRouter);
App.use('/', AdminOpsRouter);

App.listen(process.env.PORT, () => {
  console.log("Server is running");
});
