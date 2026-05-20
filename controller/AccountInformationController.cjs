const User = require("../model/UserSchema.cjs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function AccountInformationController(req, res) {
  try {
    const FindUser = await User.findOne({ Name: req.user.Name });

    const name = FindUser.Name;
    const orders = FindUser.Orders;
    const date = FindUser.AccountCreatedAt;

    return res.json({ name, orders, date });
  } catch (error) {
    console.error(error);
  }
}

async function Logout(req, res) {
  try {
    res.clearCookie('RefreshToken', { httpOnly: true });
    return res.sendStatus(200);
  }
  catch (error) {
    console.error(error);
  }
}

async function DeleteAccount(req, res) {
  const { name, password } = req.body;

  if (!name || !password)
    return res.json({ message: 'All fields are required for Deleting Account' });
  const FindUser = await User.findOne({ Name: name });
  if (!FindUser)
    return res.json({ message: 'User not found' });
  const checkPassword = bcrypt.compare(password, FindUser.Password);
  if (!checkPassword)
    return res.json({ message: "Invalid password" });

  if (FindUser.Orders.length > 0)
    return res.json({ message: 'Pending orders cannot delete Account' });

  await User.findByIdAndDelete(FindUser._id);
  return res.json({ message: 'Account deleted successfully' });
}
async function SeeMyOrders(req, res) {
  try {
    const FindUser = await User.findOne({ Name: req.user.Name });

    if (!FindUser)
      return res.sendStatus(400);

    const orders = FindUser.Orders;
    return res.status(200).json({ orders: orders })
  }
  catch (error) {
    console.error(error);
  }
}
module.exports = { AccountInformationController, SeeMyOrders, Logout, DeleteAccount };
