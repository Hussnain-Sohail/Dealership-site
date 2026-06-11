const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema({
  Company: String,
  Name: String,
  TopSpeed: Number,
  Price: Number,
  HorsePower: Number,
  Engine: String,
  UnitsAvailable: Number,
  Image_Public_id: String,
  Image_Secure_URL: String,
});

module.exports = mongoose.model("Bike", BikeSchema);
