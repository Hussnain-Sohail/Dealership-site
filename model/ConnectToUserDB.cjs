const mongoose = require("mongoose");

async function ConnectToUserDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
    console.log("Not connected to db");
  }
}

module.exports = ConnectToUserDB;
