const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const express = require("express");
const Bike = require("../model/BikeSchema.cjs");
const User = require('../model/UserSchema.cjs');
const Order = require('../model/OrderSchema.cjs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const z = require('zod');

const bikeData = z.object({
  companyName: z.string(),
  bikeName: z.string(),
  password: z.string().min(6),
  city: z.string(),
  contactNumber: z.string().length(11),
})

async function FetchBikes(req, res) {
  try {
    const { Company } = req.body;
    if (!Company) {
      return res.json({ message: "Please select company first", Bikes: [] });
    }
    const Bikes = await Bike.find({ Company: Company });
    if (!Bikes)
      return res.json({ message: "Company not found !" });
    res.json({ Bikes: Bikes, message: "" });
  } catch (error) {
    console.error(error);
  }
}

async function FindBike(req, res) {
  try {
    const { companyName, bikeName } = req.body;
    if (!companyName || !bikeName)
      return res.json({
        message: "All fields are required to search for bike",
      });

    const FindBike = await Bike.findOne({
      Company: companyName,
      Name: bikeName,
    });

    if (!FindBike)
      return res.json({
        message: `No matching results for ${companyName} ${bikeName}`,
      });

    return res.json({ FindBike: FindBike });
  } catch (error) {
    console.error(error);
  }
}

async function BikeDetails(req, res) {
  const { Company, Name } = req.body;
  if (!Company || !Name)
    return res.json({ message: 'Could not fetch bike' });

  const bike = await Bike.findOne({ Company: Company, Name: Name });

  if (!bike)
    return res.json({ message: 'Could not fetch bike' });

  return res.json({ bike: bike });
}

async function PurchaseBike(req, res) {
  const session = await mongoose.startSession();
  try {

    const name = req.user.Name;
    const validData = bikeData.safeParse(req.body)
    {
      if (!validData.success)
        return res.status(400).json({ message: validData.error.issues[0].message })
    }

    const citiesAuthorizedForShipping = JSON.parse(process.env.CITIES ?? '[]');

    let isValidCity = false;
    for (const x of citiesAuthorizedForShipping) {
      if (x === city.toLowerCase()) {
        isValidCity = true;
        break;
      }
    }
    if (!isValidCity) {
      return res.json({ message: `Were sorry but we do not ship to ${city}` });
    }

    const FindBike = await Bike.findOne({ Company: validData.data.companyName, Name: validData.data.bikeName });
    if (!FindBike) {
      return res.json({ message: `Bike not found` });
    }

    const FindUser = await User.findOne({ Name: name }, null, { session });
    if (!FindUser) {
      return res.json({ message: `Username not found` });
    }
    const checkPassword = await bcrypt.compare(validData.data.password, FindUser.Password);
    if (!checkPassword) {
      return res.json({ message: 'Invalid password. Could not place order' });
    }
    if (FindUser.Orders.length === 3) {
      return res.json({ message: 'Were sorry but u already have maximum order limits at a time (3) pending' });
    }

    const validPhone = new RegExp('^/0[0-9]{9}');
    if (!(validPhone.pass(validData.data.contactNumber))) {
      return res.status(403).json({ message: "Invalid phone number format" })
    }

    session.startTransaction();

    const bike = await Bike.findOneAndUpdate({
      Company: companyName,
      Name: bikeName,
      UnitsAvailable: { $gt: 0 },
    },
      {
        $inc: { UnitsAvailable: -1 }
      },
      {
        new: true,
        session,
      },
    );
    const NewOrder = new Order({
      BikeName: bikeName,
      CompanyName: companyName,
      OrederPlacedOnDate: new Date().toISOString(),
    });

    FindUser.Orders.push(NewOrder);

    await NewOrder.save({ session });
    await FindUser.save({ session });
    await session.commitTransaction();

    return res.json({ message: 'Order Placed successfully' });
  }
  catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ message: 'Could not place order' });
  }
}
module.exports = { FetchBikes, FindBike, BikeDetails, PurchaseBike };
