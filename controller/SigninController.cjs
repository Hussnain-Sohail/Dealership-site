const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/UserSchema.cjs");
const z = require('zod');

const userData = z.object({
  Name: z.string(),
  age: z.number().min(18),
  password: z.string().min(6),
})

async function SingUp(req, res) {
  try {
    const validData = userData.safeParse(req.body);
    if (!validData.success) {
      return res.status(400).json({ message: validData.error.issues[0].message })
    }

    const checkDuplicate = await User.findOne({ Name: validData.data.Name });
    if (checkDuplicate)
      return res.json({ message: `Username ${validData.data.Name} already exists` });

    const HashedPassword = await bcrypt.hash(validData.data.password, 10);
    const NewUser = new User({
      Name: validData.data.Name,
      Age: validData.data.age,
      Password: HashedPassword,
      AccountCreatedAt: new Date().toLocaleDateString(),
    });
    await NewUser.save();

    const AccessToken = jwt.sign(
      { Name: Name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" },
    );
    const RefreshToken = jwt.sign(
      { Name: Name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5m" },
    );

    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });
    return res.json({
      message: `Account for ${Name} created successfully`,
      AccessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = SingUp;
