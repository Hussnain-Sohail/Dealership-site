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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

async function verfiyRequestData(req, res) {
  const data = { valid: false, user: {}, bike: {} };
  const name = req.user.Name;
  const validData = bikeData.safeParse(req.body)
  if (!validData.success) {
    res.status(400).json({ message: validData.error.issues[0].message });
    return data;
  }

  const citiesAuthorizedForShipping = JSON.parse(process.env.CITIES ?? '[]');

  let isValidCity = false;
  for (const x of citiesAuthorizedForShipping) {
    if (x === validData.data.city.toLowerCase()) {
      isValidCity = true;
      break;
    }
  }
  if (!isValidCity) {
    res.status(400).json({ message: `Were sorry but we do not ship to ${validData.data.city}` });
    return data;
  }

  const FindBike = await Bike.findOne({ Company: validData.data.companyName, Name: validData.data.bikeName });
  if (!FindBike || FindBike === undefined) {
    res.status(400).json({ message: `Bike not found` });
    return data;
  }

  const FindUser = await User.findOne({ Name: name }, null, { session });
  if (!FindUser) {
    res.status(403).json({ message: `Username not found` });
    return data;
  }
  const checkPassword = await bcrypt.compare(validData.data.password, FindUser.Password);
  if (!checkPassword) {
    res.status(403).json({ message: 'Invalid password. Could not place order' });
    return data;
  }
  if (FindUser.Orders.length === 3) {
    res.status(400).json({ message: 'Were sorry but u already have maximum order limits at a time (3) pending' });
    return data;
  }
  data.valid = true;
  data.user = FindUser;
  data.bike = FindBike;

  return data;
}

async function stripeHandler(req, res) {
  const data = await verfiyRequestData(req, res);
  if (!data.valid)
    return;

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${data.bike.Company} ${data.bike.Name}`
        },
        unit_amount: data.bike.Price * 100
      },
      quantity: 1,
    }],
    metadata: {
      bikeId: data.bike._id.toString(),
      userId: data.user._id.toString(),
    },
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  });

  res.status(200).json({ message: '', stripeURL: stripeSession.url });
  return stripeSession;
}

async function PurchaseBike(req, res) {
  const session = await mongoose.startSession();
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === 'checkout.session.completed') {
      session.startTransaction();

      const { bikeId, userId } = event.data.object.metadata;

      const updatedBike = await Bike.findOneAndUpdate({
        _id: bikeId,
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
      if (!updatedBike) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Bike not found' });
      }

      const FindUser = await User.findById(userId).session(session);
      if (!FindUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'User not found' });
      }

      const NewOrder = new Order({
        Company: updatedBike.Company,
        Bike: updatedBike.Name,
        OrederPlacedOnDate: new Date().toISOString(),
      });
      FindUser.Orders.push(NewOrder);

      await NewOrder.save({ session });
      await FindUser.save({ session });
      await session.commitTransaction();

      return res.sendStatus(200);
    } else
      return res.sendStatus(200);
  }
  catch (error) {
    console.error(error);
    await session.abortTransaction();
    return res.status(500).json({ message: 'Could not place order' });
  }
}
module.exports = { FetchBikes, FindBike, BikeDetails, PurchaseBike };
